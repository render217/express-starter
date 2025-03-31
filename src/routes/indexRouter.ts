import { Request, Response, Router } from 'express';

const router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     description: Welcome to API service
 *     responses:
 *       200:
 *         description: Returns a welcome message
 */
router.get('/', (req: Request, res: Response) => {
  res.send('Hello, Welcome');
});

export default router;
