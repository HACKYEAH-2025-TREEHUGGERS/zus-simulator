import { Router } from 'express';
import { asyncHandler } from '../middleware';
import { funFactController } from '../controllers/fun-facts.controller';

const router = Router();

router.get('/', asyncHandler(funFactController.getRandomFunFact));

export default router;
