import { Response } from 'express';
import { AIService } from '@/services/aiService';
import { AuthenticatedRequest } from '@/middleware/auth';
import HttpError from '@/utils/HttpError';
import ctrlWrapper from '@/utils/ctrlWrapper';
import User from '@/models/userModel';

const aiService = new AIService();

class AIController {
  public chat = ctrlWrapper(async (req: AuthenticatedRequest, res: Response) => {
    const { message, history } = req.body;
    const { userId } = req;

    if (!process.env.GEMINI_API_KEY) {
      throw new HttpError('Gemini API Key is not configured.', 500);
    }

    const user = await User.findById(userId);
    const userName = user ? user.firstName : null;

    const response = await aiService.chat(message, history, userName, userId);
    res.json({ response });
  });
}

export default new AIController();
