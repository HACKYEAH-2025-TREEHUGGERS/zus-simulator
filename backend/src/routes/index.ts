import { Router } from 'express';
import pensionRoutes from './pension.routes';
import healthRoutes from './health.routes';

const router = Router();

// Mount route modules
router.use('/pension', pensionRoutes);
router.use('/health', healthRoutes);

export default router;
