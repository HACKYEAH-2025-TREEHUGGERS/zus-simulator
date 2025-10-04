import { Router } from 'express';
import { pensionController } from '../controllers';
import { asyncHandler } from '../middleware';

const router = Router();

router.get('/info', asyncHandler(pensionController.getInfo));

router.post('/calculate', asyncHandler(pensionController.calculatePension));

router.post('/detailed', asyncHandler(pensionController.calculateDetailedPension));

router.post('/optimal-age', asyncHandler(pensionController.calculateOptimalAge));

export default router;
