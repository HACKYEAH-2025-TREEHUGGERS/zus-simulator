import { Router } from 'express';
import retirementRoutes from './retirement.routes';
import funFactsRoutes from './fun-facts.routes';

const router = Router();

// Mount route modules
router.use('/retirement', retirementRoutes);
router.use('/fun-facts', funFactsRoutes);

export default router;
