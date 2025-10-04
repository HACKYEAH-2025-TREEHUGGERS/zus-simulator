import { addYears, isBefore, parse, setDate, setMonth, subYears } from 'date-fns';
import { FEMALE_RETIREMENT_AGE, MALE_RETIREMENT_AGE } from '../constants';
import { CalculateRetirementInput } from '../schemas';
import { db } from '../db';
import { retirementProjectionParams } from '../db/schema';

type Gender = 'male' | 'female';

export class RetirementService {
  public calculateRetirementDate(gender: Gender, birthDateString: string): Date {
    const retirementAge =
      gender.toLowerCase() === 'male' ? MALE_RETIREMENT_AGE : FEMALE_RETIREMENT_AGE;
    const birthDate = parse(birthDateString, 'yyyy-MM-dd', new Date());
    const dateAtRetirementAge = addYears(birthDate, retirementAge);
    const januaryDate = setMonth(dateAtRetirementAge, 0);
    const retirementDate = setDate(januaryDate, 1);

    return retirementDate;
  }

  public async calculateRetirementValue(payload: CalculateRetirementInput): Promise<number> {
    const today = new Date();
    const oldRetirementDate = new Date(1999, 0, 1);
    const isOldRetirementSystem = payload.workStartDate < 1999

    if (isOldRetirementSystem) {
      return -1;
    }

    const projectionParams = await db.select().from(retirementProjectionParams);
    const averageLifetime = await db.select().from(averageLifetime)

    const contributionPercentage = 0.1952;
    const currentYear = new Date().getFullYear();

    let currentAccountBalance = Math.max(0, payload.zusFunds || 0);

    let salaryNormalized = payload.grossSalary;
    for (let year = currentYear; year < payload.expectedRetirementYear; year++) {
      const thisYearProjectionParams = projectionParams.find(p => p.year === year);
      
      // przed dodaniem stawki pomnozyc przez realWageGrowthIndex
      const realWageGrowthIndex = thisYearProjectionParams?.realWageGrowthIndex || 100
      salaryNormalized *= realWageGrowthIndex;
      
      // dodac kwote brutto * contributionPercentage (wplata na konto emerytalne zus)
      currentAccountBalance += salaryNormalized * contributionPercentage * 12;
      
      // pomnozyc przez waloryzacje
      const valorizationIndex = thisYearProjectionParams?.accountValorizationIndex || 100;
      currentAccountBalance *= (valorizationIndex / 100);
    }

    const ageOnRetirement = payload.expectedRetirementYear - (today.getFullYear() - payload.age);

    console.log(currentAccountBalance)
    return currentAccountBalance / ageOnRetirement / 12;
  }
}

export const retirementService = new RetirementService();
