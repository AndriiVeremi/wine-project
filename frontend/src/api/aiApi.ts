import axios from './axios';
import { auth } from '@/config/firebase';

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export const chatWithAI = async (message: string, history: ChatMessage[] = []) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('User not authenticated.');
  }

  const token = await user.getIdToken();

  const response = await axios.post(
    '/ai/chat',
    { message, history, userName: user.displayName },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data.response;
};
