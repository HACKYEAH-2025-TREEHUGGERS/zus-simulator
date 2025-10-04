import { Request, Response } from 'express';
import { pensionService } from '../services';
import { ApiResponse, PensionCalculationInput } from '../types';

class PensionController {
  calculatePension = async (req: Request, res: Response) => {
    const input: PensionCalculationInput = req.body;
    const result = pensionService.calculatePension(input);

    const response: ApiResponse = {
      success: true,
      data: result,
      message: 'Pension calculated successfully',
    };

    res.json(response);
  };

  calculateDetailedPension = async (req: Request, res: Response) => {
    const input: PensionCalculationInput = req.body;
    const result = pensionService.calculateDetailedBreakdown(input);

    const response: ApiResponse = {
      success: true,
      data: result,
      message: 'Detailed pension breakdown calculated successfully',
    };

    res.json(response);
  };

  calculateOptimalAge = async (req: Request, res: Response) => {
    const input: PensionCalculationInput = req.body;
    const result = pensionService.calculateOptimalRetirementAge(input);

    const response: ApiResponse = {
      success: true,
      data: result,
      message: 'Optimal retirement age calculated',
    };

    res.json(response);
  };

  getInfo = async (req: Request, res: Response) => {
    const response: ApiResponse = {
      success: true,
      data: {
        version: '1.0.0',
        calculationMethods: ['basic', 'detailed', 'optimal-age'],
        defaultParameters: {
          contributionRate: 0.196,
          expectedReturnRate: 0.05,
          lifeExpectancyAfterRetirement: 20,
        },
        supportedCountries: ['Poland'],
      },
      message: 'Pension calculation service information',
    };

    res.json(response);
  };
}

export const pensionController = new PensionController();
