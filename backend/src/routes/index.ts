import { Router } from 'express';
import retirementRoutes from './retirement.routes';

const router = Router();

// Mount route modules
router.use('/retirement', retirementRoutes);

export default router;
