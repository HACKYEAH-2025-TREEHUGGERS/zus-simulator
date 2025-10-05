import { addYears, isBefore, parse, setDate, setMonth, subYears } from 'date-fns';
import { FEMALE_RETIREMENT_AGE, MALE_RETIREMENT_AGE } from '../constants';
import { CalculateRetirementInput } from '../schemas';
import { db } from '../db';
import {
  retirementProjectionParams,
  averageLifetime,
  avgSickLeaveDuration,
  users,
} from '../db/schema';
import { avg, eq } from 'drizzle-orm';

type Gender = 'male' | 'female';

export class RetirementService {
  private roundNumber(num: number): number {
    return Math.round(num * 100) / 100;
  }

  public calculateRetirementDate(gender: Gender, birthDateString: string): Date {
    const retirementAge =
      gender.toLowerCase() === 'male' ? MALE_RETIREMENT_AGE : FEMALE_RETIREMENT_AGE;
    const birthDate = parse(birthDateString, 'yyyy-MM-dd', new Date());
    const dateAtRetirementAge = addYears(birthDate, retirementAge);
    const januaryDate = setMonth(dateAtRetirementAge, 0);
    const retirementDate = setDate(januaryDate, 1);

    return retirementDate;
  }

  private calculateAccountBalance(
    initialBalance: number,
    grossSalary: number,
    projectionParams: any[],
    currentYear: number,
    expectedRetirementYear: number,
    sickDaysPerYear?: number
  ): number {
    const contributionPercentage = 0.1952;
    let currentAccountBalance = initialBalance;
    let salaryNormalized = grossSalary;

    for (let year = currentYear; year < expectedRetirementYear; year++) {
      const thisYearProjectionParams = projectionParams.find(p => p.year === year);

      // przed dodaniem stawki pomnozyc przez realWageGrowthIndex
      const realWageGrowthIndex = thisYearProjectionParams?.realWageGrowthIndex || 100;
      salaryNormalized *= realWageGrowthIndex;

      // dodac kwote brutto * contributionPercentage (wplata na konto emerytalne zus)
      let yearIncome = salaryNormalized * contributionPercentage * 12;

      if (sickDaysPerYear !== undefined) {
        currentAccountBalance += (yearIncome / 365 - sickDaysPerYear) * 365;
      } else {
        currentAccountBalance += yearIncome;
      }

      // pomnozyc przez waloryzacje
      const valorizationIndex = thisYearProjectionParams?.accountValorizationIndex || 100;
      currentAccountBalance *= valorizationIndex / 100;
    }

    return currentAccountBalance;
  }

  private async calculateYearsToReachRetirement(
    payload: CalculateRetirementInput,
    targetRetirementAmount: number,
    projectionParams: any[],
    sickDays: { avgFemale: string | null; avgMale: string | null }[]
  ): Promise<number> {
    const currentYear = new Date().getFullYear();
    const userSickDays = payload.includeSickLeave
      ? parseFloat((payload.gender === 'male' ? sickDays[0]?.avgMale : sickDays[0]?.avgFemale) ?? '0')
      : undefined;

    const initialBalance = Math.max(0, payload.zusFunds || 0);
    let yearsToWork = 0;
    const maxYears = 50; // Safety limit to prevent infinite loop

    while (yearsToWork <= maxYears) {
      const testRetirementYear = currentYear + yearsToWork;
      
      let accountBalance = this.calculateAccountBalance(
        initialBalance,
        payload.grossSalary,
        projectionParams,
        currentYear,
        testRetirementYear,
        userSickDays
      );

      // Add initial capital for old retirement system
      if (payload.workStartDate < 1999) {
        accountBalance += payload.initialCapital || 0;
      }

      // Calculate expected lifetime at retirement age
      const ageOnRetirement = testRetirementYear - (new Date().getFullYear() - payload.age);
      const avgLife = await db
        .select()
        .from(averageLifetime)
        .where(eq(averageLifetime.age, ageOnRetirement));

      const expectedLifetime = parseFloat((avgLife[0] as any)[`y_${testRetirementYear}`]);
      const monthlyRetirement = accountBalance / expectedLifetime;

      if (monthlyRetirement >= targetRetirementAmount) {
        // Return additional years needed beyond expected retirement year
        return Math.max(0, testRetirementYear - payload.expectedRetirementYear);
      }

      yearsToWork++;
    }

    return maxYears; // Return max if target cannot be reached
  }

  private async calculateSalaryToReachRetirement(
    payload: CalculateRetirementInput,
    targetRetirementAmount: number,
    projectionParams: any[],
    sickDays: { avgFemale: string | null; avgMale: string | null }[]
  ): Promise<number> {
    const currentYear = new Date().getFullYear();
    const userSickDays = payload.includeSickLeave
      ? parseFloat((payload.gender === 'male' ? sickDays[0]?.avgMale : sickDays[0]?.avgFemale) ?? '0')
      : undefined;

    const initialBalance = Math.max(0, payload.zusFunds || 0);
    let testSalary = payload.grossSalary;
    const salaryIncrement = 100;
    const maxSalary = payload.grossSalary * 10; // Safety limit

    while (testSalary <= maxSalary) {
      let accountBalance = this.calculateAccountBalance(
        initialBalance,
        testSalary,
        projectionParams,
        currentYear,
        payload.expectedRetirementYear,
        userSickDays
      );

      // Add initial capital for old retirement system
      if (payload.workStartDate < 1999) {
        accountBalance += payload.initialCapital || 0;
      }

      // Calculate expected lifetime at retirement age
      const ageOnRetirement = payload.expectedRetirementYear - (new Date().getFullYear() - payload.age);
      const avgLife = await db
        .select()
        .from(averageLifetime)
        .where(eq(averageLifetime.age, ageOnRetirement));

      const expectedLifetime = parseFloat((avgLife[0] as any)[`y_${payload.expectedRetirementYear}`]);
      const monthlyRetirement = accountBalance / expectedLifetime;

      if (monthlyRetirement >= targetRetirementAmount) {
        return this.roundNumber(testSalary);
      }

      testSalary += salaryIncrement;
    }

    return this.roundNumber(maxSalary); // Return max if target cannot be reached
  }

  public async calculateRetirementEndpoint(payload: CalculateRetirementInput) {
    const today = new Date();
    const isOldRetirementSystem = payload.workStartDate < 1999;

    const projectionParams = await db.select().from(retirementProjectionParams);
    const sickDays = await db
      .select({
        avgFemale: avg(avgSickLeaveDuration.avg_female_sick_leave_days).as('avgFemale'),
        avgMale: avg(avgSickLeaveDuration.avg_male_sick_leave_days).as('avgMale'),
      })
      .from(avgSickLeaveDuration);

    const currentYear = new Date().getFullYear();
    const userSickDays = payload.gender === 'male' ? sickDays[0]?.avgMale : sickDays[0]?.avgFemale;

    let currentAccountBalance = this.calculateAccountBalance(
      Math.max(0, payload.zusFunds || 0),
      payload.grossSalary,
      projectionParams,
      currentYear,
      payload.expectedRetirementYear
    );

    let currentAccountBalanceWithSickDays = this.calculateAccountBalance(
      Math.max(0, payload.zusFunds || 0),
      payload.grossSalary,
      projectionParams,
      currentYear,
      payload.expectedRetirementYear,
      parseFloat(userSickDays ?? '0')
    );

    let currentAccountBalanceForNow = this.calculateAccountBalance(
      Math.max(0, payload.zusFunds || 0),
      payload.grossSalary,
      projectionParams,
      currentYear,
      new Date().getFullYear()
    );

    if (isOldRetirementSystem) {
      currentAccountBalance += payload.initialCapital || 0;
      currentAccountBalanceWithSickDays += payload.initialCapital || 0;
      currentAccountBalanceForNow += payload.initialCapital || 0;
    }

    const ageOnRetirement = payload.expectedRetirementYear - (today.getFullYear() - payload.age);
    const avgLife = await db
      .select()
      .from(averageLifetime)
      .where(eq(averageLifetime.age, ageOnRetirement));

    const expectedLifetime = parseFloat((avgLife[0] as any)[`y_${payload.expectedRetirementYear}`]);

    const expectedRetirementValue = currentAccountBalance / expectedLifetime;
    const expectedRetirementValueWithSickDays =
      currentAccountBalanceWithSickDays / expectedLifetime;
    const expectedRetirementValueForNow = currentAccountBalanceForNow / expectedLifetime;
    const replacementRate = (expectedRetirementValue / payload.grossSalary) * 100;

    let yearsToReachWantedRetirement = 0;
    const balanceToUse = payload.includeSickLeave
      ? currentAccountBalanceWithSickDays
      : currentAccountBalance;

    const expectedRetirementToUse = balanceToUse / expectedLifetime;
    if (expectedRetirementToUse < payload.wantedRetirement) {
      yearsToReachWantedRetirement = await this.calculateYearsToReachRetirement(
        payload,
        payload.wantedRetirement,
        projectionParams,
        sickDays
      );
    }

    let salaryToReachWantedRetirement = 0;
    if (expectedRetirementToUse < payload.wantedRetirement) {
      salaryToReachWantedRetirement = await this.calculateSalaryToReachRetirement(
        payload,
        payload.wantedRetirement,
        projectionParams,
        sickDays
      );
    }

    return {
      expectedRetirementValue: this.roundNumber(expectedRetirementValue),
      expectedRetirementValueWithSickDays: this.roundNumber(expectedRetirementValueWithSickDays),
      expectedRetirementValueDifference: this.roundNumber(
        expectedRetirementValueWithSickDays - expectedRetirementValue
      ),
      expectedRetirementValueForNow: this.roundNumber(expectedRetirementValueForNow),
      estimatedSickDaysWomen: sickDays[0].avgFemale || 0,
      estimatedSickDaysMen: sickDays[0].avgMale || 0,
      replacementRate: this.roundNumber(replacementRate),
      yearsToReachWantedRetirement: yearsToReachWantedRetirement,
      salaryToReachWantedRetirement: salaryToReachWantedRetirement,
    };
  }
}

export const retirementService = new RetirementService();
