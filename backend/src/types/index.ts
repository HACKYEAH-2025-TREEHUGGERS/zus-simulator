import { Request, Response, NextFunction } from 'express';

// Base types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Pension calculation types
export interface PensionCalculationInput {
  birthDate: string; // ISO date string
  retirementAge: number;
  currentSalary: number;
  yearsOfService: number;
  contributionRate?: number;
  additionalContributions?: number;
  expectedReturnRate?: number;
}

export interface PensionCalculationResult {
  monthlyPension: number;
  yearlyPension: number;
  totalAccumulated: number;
  replacementRate: number; // percentage of current salary
  calculatedAt: Date;
  assumptions: {
    retirementAge: number;
    contributionRate: number;
    expectedReturnRate: number;
  };
}

export interface DetailedPensionBreakdown {
  basic: PensionCalculationResult;
  yearByYearProjection: YearlyProjection[];
  scenarios: {
    optimistic: PensionCalculationResult;
    pessimistic: PensionCalculationResult;
  };
}

export interface YearlyProjection {
  year: number;
  age: number;
  contributions: number;
  accumulated: number;
  projectedPension: number;
}

// User contribution tracking
export interface ContributionRecord {
  id: number;
  userId: number;
  amount: number;
  date: Date;
  type: 'regular' | 'additional' | 'employer';
}

// Express middleware types
export type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export interface AuthenticatedRequest extends Request {
  userId?: number;
  user?: any;
}
