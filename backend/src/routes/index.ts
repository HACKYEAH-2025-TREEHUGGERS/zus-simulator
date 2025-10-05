import { Router } from 'express';
import retirementRoutes from './retirement.routes';
import funFactsRoutes from './fun-facts.routes';
import exportRoutes from './export.routes';

const router = Router();

router.use('/retirement', retirementRoutes);
router.use('/fun-facts', funFactsRoutes);
router.use('/export', exportRoutes);

export default router;
