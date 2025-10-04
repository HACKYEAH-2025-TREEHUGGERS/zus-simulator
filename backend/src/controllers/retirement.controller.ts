import { Request, Response } from 'express';
import { retirementService } from '../services';

class RetirementController {
  calculateRetirement = async (req: Request, res: Response) => {
    const input = req.body;
    console.log(input);

    res.json({
      date: retirementService.calculateRetirementDate(input.gender, input.date),
    });
  };
}

export const retirementController = new RetirementController();
