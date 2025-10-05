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
    };
  }
}

export const retirementService = new RetirementService();
