import {
  PensionCalculationInput,
  PensionCalculationResult,
  DetailedPensionBreakdown,
  YearlyProjection,
} from '../types';

/**
 * Service handling pension calculation logic
 * This is where you'll implement your complex mathematical formulas
 */
export class PensionService {
  // Default constants - can be configured
  private readonly DEFAULT_CONTRIBUTION_RATE = 0.196; // 19.6% (example)
  private readonly DEFAULT_RETURN_RATE = 0.05; // 5% annual return
  private readonly MONTHS_PER_YEAR = 12;

  /**
   * Calculate basic pension based on Polish ZUS system or custom logic
   */
  calculatePension(input: PensionCalculationInput): PensionCalculationResult {
    const {
      birthDate,
      retirementAge,
      currentSalary,
      yearsOfService,
      contributionRate = this.DEFAULT_CONTRIBUTION_RATE,
      additionalContributions = 0,
      expectedReturnRate = this.DEFAULT_RETURN_RATE,
    } = input;

    // Calculate years until retirement
    const birthYear = new Date(birthDate).getFullYear();
    const currentYear = new Date().getFullYear();
    const currentAge = currentYear - birthYear;
    const yearsUntilRetirement = Math.max(0, retirementAge - currentAge);

    // Calculate total accumulated capital
    const monthlyContribution = (currentSalary * contributionRate) / this.MONTHS_PER_YEAR;
    const totalMonths = yearsUntilRetirement * this.MONTHS_PER_YEAR;

    // Future value of annuity formula: FV = PMT × [(1 + r)^n - 1] / r
    const monthlyRate = expectedReturnRate / this.MONTHS_PER_YEAR;
    let totalAccumulated = 0;

    if (monthlyRate > 0) {
      totalAccumulated =
        monthlyContribution * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
    } else {
      totalAccumulated = monthlyContribution * totalMonths;
    }

    // Add additional contributions (simplified - assuming lump sum at start)
    totalAccumulated +=
      additionalContributions * Math.pow(1 + expectedReturnRate, yearsUntilRetirement);

    // Calculate monthly pension (simplified: total / life expectancy months)
    // Typical life expectancy after retirement: ~20 years
    const expectedYearsInRetirement = 20;
    const monthlyPension = totalAccumulated / (expectedYearsInRetirement * this.MONTHS_PER_YEAR);
    const yearlyPension = monthlyPension * this.MONTHS_PER_YEAR;

    // Calculate replacement rate (pension as % of current salary)
    const replacementRate = (yearlyPension / currentSalary) * 100;

    return {
      monthlyPension: Math.round(monthlyPension * 100) / 100,
      yearlyPension: Math.round(yearlyPension * 100) / 100,
      totalAccumulated: Math.round(totalAccumulated * 100) / 100,
      replacementRate: Math.round(replacementRate * 100) / 100,
      calculatedAt: new Date(),
      assumptions: {
        retirementAge,
        contributionRate,
        expectedReturnRate,
      },
    };
  }

  /**
   * Calculate detailed breakdown with year-by-year projections
   */
  calculateDetailedBreakdown(input: PensionCalculationInput): DetailedPensionBreakdown {
    const basic = this.calculatePension(input);
    const yearByYearProjection = this.calculateYearlyProjections(input);

    // Calculate optimistic scenario (higher returns)
    const optimistic = this.calculatePension({
      ...input,
      expectedReturnRate: (input.expectedReturnRate || this.DEFAULT_RETURN_RATE) * 1.5,
    });

    // Calculate pessimistic scenario (lower returns)
    const pessimistic = this.calculatePension({
      ...input,
      expectedReturnRate: (input.expectedReturnRate || this.DEFAULT_RETURN_RATE) * 0.5,
    });

    return {
      basic,
      yearByYearProjection,
      scenarios: {
        optimistic,
        pessimistic,
      },
    };
  }

  /**
   * Generate year-by-year projection
   */
  private calculateYearlyProjections(input: PensionCalculationInput): YearlyProjection[] {
    const {
      birthDate,
      retirementAge,
      currentSalary,
      contributionRate = this.DEFAULT_CONTRIBUTION_RATE,
      expectedReturnRate = this.DEFAULT_RETURN_RATE,
    } = input;

    const birthYear = new Date(birthDate).getFullYear();
    const currentYear = new Date().getFullYear();
    const currentAge = birthYear ? currentYear - birthYear : 0;
    const yearsUntilRetirement = Math.max(0, retirementAge - currentAge);

    const projections: YearlyProjection[] = [];
    let accumulated = 0;
    const yearlyContribution = currentSalary * contributionRate;

    for (let year = 1; year <= yearsUntilRetirement; year++) {
      // Add contributions and apply returns
      accumulated = (accumulated + yearlyContribution) * (1 + expectedReturnRate);

      // Project pension at this point
      const projectedMonthlyPension = accumulated / (20 * this.MONTHS_PER_YEAR);

      projections.push({
        year: currentYear + year,
        age: currentAge + year,
        contributions: yearlyContribution,
        accumulated: Math.round(accumulated * 100) / 100,
        projectedPension: Math.round(projectedMonthlyPension * 100) / 100,
      });
    }

    return projections;
  }

  /**
   * Calculate optimal retirement age based on different factors
   * This is an example of complex business logic you might need
   */
  calculateOptimalRetirementAge(input: PensionCalculationInput): {
    recommendedAge: number;
    reasoning: string;
    comparison: Array<{ age: number; monthlyPension: number }>;
  } {
    const ages = [60, 62, 65, 67, 70];
    const comparison = ages.map(age => {
      const result = this.calculatePension({ ...input, retirementAge: age });
      return {
        age,
        monthlyPension: result.monthlyPension,
      };
    });

    // Find age with best monthly pension
    const optimal = comparison.reduce((best, current) =>
      current.monthlyPension > best.monthlyPension ? current : best
    );

    return {
      recommendedAge: optimal.age,
      reasoning: `Retiring at age ${optimal.age} provides the highest monthly pension of ${optimal.monthlyPension.toFixed(2)} based on current projections.`,
      comparison,
    };
  }
}

// Export singleton instance
export const pensionService = new PensionService();
