import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import AIController from '@/controllers/aiController';
import validateBody from '@/middleware/validateBody';
import { aiChatSchema } from '@/schemas/aiSchemas';
import { authMiddleware } from '@/middleware/auth';

const router = Router();

const aiChatLimiter = rateLimit({
  windowMs: Number(process.env.AI_RATE_LIMIT_WINDOW_MS) || 60 * 60 * 1000, // 1 hour
  limit: Number(process.env.AI_RATE_LIMIT_MAX_REQUESTS) || 15, // 15 requests
  message: {
    message: 'AI chat limit reached for this hour. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * @swagger
 * /ai/chat:
 *   post:
 *     tags: [AI]
 *     summary: Chat with the AI Assistant (Protected)
 *     description: This endpoint requires user authentication.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Привіт, допоможи вибрати вино!
 *               history:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     role:
 *                       type: string
 *                       enum: [user, model]
 *                       example: user
 *                     parts:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           text:
 *                             type: string
 *                             example: Я рекомендую вам червоне вино
 *     responses:
 *       200:
 *         description: AI response
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       429:
 *         description: Too many requests
 *       500:
 *         description: Server error
 */
router.post(
  '/chat',
  aiChatLimiter,
  authMiddleware,
  validateBody(aiChatSchema),
  AIController.chat,
);

export default router;
