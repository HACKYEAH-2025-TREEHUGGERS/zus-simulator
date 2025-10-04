import { Request, Response } from 'express';
import { funFactsService } from '../services/fun-facts.service';

class FunFactController {
  public async getRandomFunFact(req: Request, res: Response): Promise<void> {
    const fact = await funFactsService.getRandomFunFact();
    res.json({ fact });
  }
}

export const funFactController = new FunFactController();
