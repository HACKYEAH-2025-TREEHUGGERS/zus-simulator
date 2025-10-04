import { Router } from 'express';
import { retirementController } from '../controllers';
import { asyncHandler } from '../middleware';

const router = Router();

router.post('/calculate', asyncHandler(retirementController.calculateRetirement));

export default router;
