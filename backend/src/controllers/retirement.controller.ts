import { Request, Response } from 'express';
import { retirementService } from '../services';
import { calculateRetirementSchema } from '../schemas';

class RetirementController {
  calculateRetirement = async (req: Request, res: Response) => {
    const input = calculateRetirementSchema.parse(req.body);

    res.json({
      date: retirementService.calculateRetirementDate(input.gender, input.date),
    });
  };
}

export const retirementController = new RetirementController();
