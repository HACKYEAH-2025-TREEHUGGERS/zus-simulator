import { Request, Response } from 'express';
import { retirementService } from '../services';
import { calculateRetirementSchema } from '../schemas';

class RetirementController {
  public async calculateRetirement(req: Request, res: Response): Promise<void> {
    const input = calculateRetirementSchema.parse(req.body);

    const result = {
      expectedRetirementAge: retirementService.getExpectedRetirementDate(input.gender, input.date),
    };

    res.json(result);
  }
}

export const retirementController = new RetirementController();
