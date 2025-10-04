import { addYears, parse, setDate, setMonth } from 'date-fns';
import { FEMALE_RETIREMENT_AGE, MALE_RETIREMENT_AGE } from '../constants';

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
}

export const retirementService = new RetirementService();
