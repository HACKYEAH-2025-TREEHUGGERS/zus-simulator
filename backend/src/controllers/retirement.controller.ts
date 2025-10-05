import { Request, Response } from 'express';
import { retirementService } from '../services';
import { calculateRetirementSchema } from '../schemas';

class RetirementController {
  public async calculateRetirement(req: Request, res: Response): Promise<void> {
    const input = calculateRetirementSchema.parse(req.body);

    const result = await retirementService.calculateRetirementEndpoint(input);

    res.json(result);
  }
}

export const retirementController = new RetirementController();
