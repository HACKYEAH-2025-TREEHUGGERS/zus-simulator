import { Router } from 'express';
import { exportController } from '../controllers';
import { asyncHandler } from '../middleware';

const router = Router();

router.post('/pdf', asyncHandler(exportController.generatePDF));
router.post('/excel', asyncHandler(exportController.generateExcel));

export default router;
