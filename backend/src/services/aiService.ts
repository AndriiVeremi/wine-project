import {
  GoogleGenAI,
  type Content,
  type Part,
  type Tool,
  type FunctionDeclaration,
} from '@google/genai';
import { WineService } from '@/services/wineService';
import { getWineryByName } from '@/services/wineryService';
import { getToursByRegion } from '@/services/tourService';
import { getUserFavorites } from '@/services/userService';
import Region from '@/models/regionModel';
import dotenv from 'dotenv';
import HttpError from '@/utils/HttpError';
import { SOMMELIER_PROMPT, AI_CONFIG } from '@/config/aiConfig';
import { sanitizeAIResponse } from '@/utils/aiUtils';

dotenv.config();

const wineService = new WineService();

interface AIChatHistoryItem {
  role: 'user' | 'model';
  parts: { text: string }[];
}

interface SearchWinesArgs {
  name?: string;
  color?: string;
  sweetness?: string;
  maxPrice?: number;
  minRating?: number;
  region?: string;
}

interface GetRegionInfoArgs {
  regionName: string;
}

interface GetWineryInfoArgs {
  wineryName: string;
}

interface SearchToursArgs {
  regionName: string;
}

const tools: Tool[] = [
  {
    functionDeclarations: [
      {
        name: 'searchWines',
        description: 'Search for wines in the database based on various criteria.',
        parameters: {
          type: 'OBJECT',
          properties: {
            name: { type: 'STRING', description: 'Wine name' },
            color: { type: 'STRING', description: 'Wine color' },
            sweetness: { type: 'STRING', description: 'Sweetness level' },
            maxPrice: { type: 'NUMBER', description: 'Maximum price' },
            minRating: { type: 'NUMBER', description: 'Minimum rating' },
            region: { type: 'STRING', description: 'Region or country' },
          },
        },
      },
      {
        name: 'getRegionInfo',
        description: 'Get detailed information about a wine region.',
        parameters: {
          type: 'OBJECT',
          properties: { regionName: { type: 'STRING' } },
          required: ['regionName'],
        },
      },
      {
        name: 'getWineryInfo',
        description: 'Get detailed information about a winery.',
        parameters: {
          type: 'OBJECT',
          properties: { wineryName: { type: 'STRING' } },
          required: ['wineryName'],
        },
      },
      {
        name: 'searchTours',
        description: 'Search for wine tours.',
        parameters: {
          type: 'OBJECT',
          properties: { regionName: { type: 'STRING' } },
          required: ['regionName'],
        },
      },
      {
        name: 'getMyFavoriteWines',
        description: "Get user's favorite wines.",
        parameters: { type: 'OBJECT', properties: {} },
      },
    ] as FunctionDeclaration[],
  },
];

export class AIService {
  public async chat(
    message: string,
    history: AIChatHistoryItem[] = [],
    userName?: string | null,
    userId?: string,
  ) {
    if (process.env.AI_ASSISTANT_ENABLED === 'false') {
      throw new HttpError('AI Sommelier is currently disabled.', 503);
    }

    if (!process.env.GEMINI_API_KEY) {
      throw new HttpError('Gemini API Key is missing.', 500);
    }

    const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const systemInstruction = userName
      ? `${SOMMELIER_PROMPT} Customer name: ${userName}.`
      : SOMMELIER_PROMPT;

    const contents: Content[] = history.map((h) => ({
      role: h.role,
      parts: h.parts.map((p) => ({ text: p.text })),
    }));
    contents.push({ role: 'user', parts: [{ text: message }] });

    let callCount = 0;
    const maxFunctionCalls = Number(process.env.AI_MAX_FUNCTION_CALLS) || 5;
    let finalResponseText = '';

    try {
      while (callCount < maxFunctionCalls) {
        const response = await client.models.generateContent({
          model: AI_CONFIG.MODEL_NAME,
          contents: contents,
          config: {
            tools,
            systemInstruction: systemInstruction,
            maxOutputTokens: AI_CONFIG.MAX_OUTPUT_TOKENS,
            temperature: AI_CONFIG.TEMPERATURE,
          },
        });

        const candidate = response.candidates?.[0];
        if (!candidate?.content?.parts) break;

        const parts = candidate.content.parts;
        const functionCalls = parts.filter((p) => p.functionCall);
        const textParts = parts.filter((p) => p.text).map((p) => p.text as string);

        if (textParts.length > 0) finalResponseText += textParts.join(' ');

        if (functionCalls.length === 0) break;

        finalResponseText = '';
        callCount++;
        const functionResponses: Part[] = [];

        for (const call of functionCalls) {
          if (!call.functionCall) continue;
          const { name, args } = call.functionCall;
          let result: unknown;

          try {
            if (name === 'searchWines') {
              const sArgs = args as unknown as SearchWinesArgs;
              const { wines } = await wineService.getAllWines({
                ...sArgs,
                maxPrice: sArgs.maxPrice?.toString(),
                minRating: sArgs.minRating?.toString(),
              });
              result = wines.length > 0 ? wines.slice(0, 5) : { message: 'No wines found' };
            } else if (name === 'getRegionInfo') {
              const rArgs = args as unknown as GetRegionInfoArgs;
              result = (await Region.findOne({
                name: { $regex: rArgs.regionName, $options: 'i' },
              })) || { error: 'Not found' };
            } else if (name === 'getWineryInfo') {
              const wArgs = args as unknown as GetWineryInfoArgs;
              const winery = await getWineryByName(wArgs.wineryName);
              result = winery
                ? { name: winery.name, address: winery.address }
                : { error: 'Not found' };
            } else if (name === 'searchTours') {
              const tArgs = args as unknown as SearchToursArgs;
              const tours = await getToursByRegion(tArgs.regionName);
              result = tours.length > 0 ? tours.slice(0, 3) : { message: 'No tours found' };
            } else if (name === 'getMyFavoriteWines') {
              result = userId ? await getUserFavorites(userId) : { error: 'Auth required' };
            }
          } catch {
            result = { error: 'Tool execution failed' };
          }

          functionResponses.push({
            functionResponse: { name: name as string, response: { result } },
          });
        }

        contents.push({ role: 'model', parts: parts as Part[] });
        contents.push({ role: 'user', parts: functionResponses });
      }

      return sanitizeAIResponse(finalResponseText) || 'I am sorry, I could not process that.';
    } catch (error: unknown) {
      console.error('AI Error:', error);
      throw new HttpError('AI Processing failed', 500);
    }
  }
}
