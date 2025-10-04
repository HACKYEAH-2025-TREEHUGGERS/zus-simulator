import { Router, Request, Response } from 'express';
import { db } from '../db';
import { users } from '../db/schema';
import { asyncHandler } from '../middleware';

const router = Router();

router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    try {
      await db.select().from(users).limit(1);
      res.json({
        success: true,
        data: {
          status: 'ok',
          database: 'connected',
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: {
          status: 'error',
          database: 'disconnected',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      });
    }
  })
);

export default router;
