import { addYears, isBefore, parse, setDate, setMonth, subYears } from 'date-fns';
import { FEMALE_RETIREMENT_AGE, MALE_RETIREMENT_AGE } from '../constants';
import { CalculateRetirementInput } from '../schemas';
import { db } from '../db';

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
    const ageDifference = subYears(today, payload.age);
    const isOldRetirementSystem = isBefore(ageDifference, oldRetirementDate);

    if (isOldRetirementSystem) {
      return -1;
    }

    // await db.select().from();

    return 0;
  }
}

export const retirementService = new RetirementService();
