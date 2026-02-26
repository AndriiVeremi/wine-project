import { Response, NextFunction } from 'express';
import { AIService } from '@/services/aiService';
import { AuthenticatedRequest } from '@/middleware/auth';
import HttpError from '@/utils/HttpError';

const aiService = new AIService();

class AIController {
  public async chat(req: AuthenticatedRequest, res: Response, _next: NextFunction) {
    const { message, history, userName } = req.body;
    const { userId } = req;

    if (!process.env.GEMINI_API_KEY) {
      throw new HttpError(
        'Gemini API Key is not configured on the server. Please add it to the .env file.',
        500,
      );
    }

    const response = await aiService.chat(message, history, userName, userId);
    res.json({ response });
  }
}

export default new AIController();
