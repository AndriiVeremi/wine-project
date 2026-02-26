import { GoogleGenerativeAI, Tool, SchemaType, Content } from '@google/generative-ai';
import { WineService } from '@/services/wineService';
import { getWineryByName } from '@/services/wineryService';
import { getToursByRegion } from '@/services/tourService';
import { getUserFavorites } from '@/services/userService';
import Region from '@/models/regionModel';
import dotenv from 'dotenv';
import HttpError from '@/utils/HttpError';
import { HydratedDocument } from 'mongoose';
import { IWinery } from '@/models/wineryModel';
import { PopulatedTour } from '@/services/tourService';

dotenv.config();

const wineService = new WineService();

interface PopulatedCountry {
  _id: string;
  name: string;
}
interface PopulatedRegion {
  _id: string;
  name: string;
}
interface PopulatedWineryForAI extends Omit<IWinery, 'country' | 'region'> {
  country: PopulatedCountry;
  region: PopulatedRegion;
}

const tools: Tool[] = [
  {
    functionDeclarations: [
      {
        name: 'searchWines',
        description: 'Search for wines in the database based on various criteria.',
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            name: { type: SchemaType.STRING, description: 'Wine name or part of the name' },
            color: {
              type: SchemaType.STRING,
              description: 'Wine color (red, white, rose, orange)',
            },
            sweetness: {
              type: SchemaType.STRING,
              description: 'Sweetness level (dry, semi-dry, semi-sweet, sweet)',
            },
            maxPrice: { type: SchemaType.NUMBER, description: 'Maximum price' },
            minRating: { type: SchemaType.NUMBER, description: 'Minimum rating (0-5)' },
            region: { type: SchemaType.STRING, description: 'Region name or country name' },
          },
        },
      },
      {
        name: 'getRegionInfo',
        description: 'Get detailed information about a wine region.',
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            regionName: { type: SchemaType.STRING, description: 'Region name' },
          },
          required: ['regionName'],
        },
      },
      {
        name: 'getWineryInfo',
        description: 'Get detailed information about a specific winery.',
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            wineryName: { type: SchemaType.STRING, description: 'The name of the winery' },
          },
          required: ['wineryName'],
        },
      },
      {
        name: 'searchTours',
        description: 'Search for wine tours in a specific region.',
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            regionName: {
              type: SchemaType.STRING,
              description: 'The name of the region to search for tours in',
            },
          },
          required: ['regionName'],
        },
      },
      {
        name: 'getMyFavoriteWines',
        description:
          "Get a list of the current user's favorite wines. Returns a list of wines with their name, winery, color, and sweetness, which can be used to understand user preferences.",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {},
        },
      },
    ],
  },
];

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

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

export class AIService {
  public async chat(
    message: string,
    history: Content[] = [],
    userName?: string | null,
    userId?: string,
  ) {
    if (process.env.AI_ASSISTANT_ENABLED === 'false') {
      throw new HttpError('AI Assistant is currently disabled by the administrator.', 503);
    }
    const baseInstruction =
      "You are a professional wine sommelier and tour guide for wineries. Your main tasks are: helping users select wines from our database, providing information about wine regions and specific wineries, recommending available wine tours, and providing personalized recommendations based on the user's favorite wines. Always be polite and professional. You MUST use the provided tools for searching wines, getting region information, getting winery information, searching tours, and getting user favorite wines when relevant to the user's query. If you cannot find information for a specific query, suggest something similar or ask for more details. If the user asks a question on a topic that is not related to wine, winemaking, wineries, or wine tours, you must politely refuse to answer and state that you are a specialized wine assistant.";

    const personalizedInstruction = userName
      ? `${baseInstruction} The user you are talking to is named ${userName}. Address them by name when appropriate.`
      : baseInstruction;

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      tools,
      systemInstruction: personalizedInstruction,
    });

    const cleanedHistory = history.filter((h) => h.role === 'user' || h.role === 'model');

    const chat = model.startChat({
      history: cleanedHistory,
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    let result = await chat.sendMessage(message);
    let response = result.response;
    let functionCalls = response.functionCalls();

    while (functionCalls && functionCalls.length > 0) {
      const parts = [];

      for (const call of functionCalls) {
        let functionResponse;

        if (call.name === 'searchWines') {
          const args = call.args as SearchWinesArgs;
          const { wines } = await wineService.getAllWines({
            ...args,
            maxPrice: args.maxPrice?.toString(),
            minRating: args.minRating?.toString(),
          });
          functionResponse =
            wines.length > 0
              ? wines.map((w) => ({
                  name: w.name,
                  price: w.price,
                  color: w.color,
                  sweetness: w.sweetness,
                  rating: w.averageRating,
                  description: w.description,
                }))
              : { message: 'Sorry, no wines found matching these criteria.' };
        } else if (call.name === 'getRegionInfo') {
          const args = call.args as GetRegionInfoArgs;
          const region = await Region.findOne({
            name: { $regex: args.regionName, $options: 'i' },
          });
          functionResponse = region || { error: 'Region not found in our database.' };
        } else if (call.name === 'getWineryInfo') {
          const args = call.args as GetWineryInfoArgs;
          const winery = (await getWineryByName(
            args.wineryName,
          )) as HydratedDocument<PopulatedWineryForAI> | null;
          if (winery) {
            functionResponse = {
              name: winery.name,
              history: winery.history,
              country: winery.country.name,
              region: winery.region.name,
              address: winery.address,
            };
          } else {
            functionResponse = { error: 'Winery not found in our database.' };
          }
        } else if (call.name === 'searchTours') {
          const args = call.args as SearchToursArgs;
          const tours = await getToursByRegion(args.regionName);
          if (tours.length > 0) {
            functionResponse = tours.map((tour: HydratedDocument<PopulatedTour>) => ({
              winery: tour.winery.name,
              tourName: tour.name,
              description: tour.description,
              price: tour.price,
              duration: tour.duration,
            }));
          } else {
            functionResponse = { message: 'Sorry, no tours found in that region.' };
          }
        } else if (call.name === 'getMyFavoriteWines') {
          if (!userId) {
            functionResponse = { error: 'User is not authenticated.' };
          } else {
            const favoriteWines = await getUserFavorites(userId);
            functionResponse =
              favoriteWines.length > 0
                ? favoriteWines
                : { message: 'User has no favorite wines yet.' };
          }
        }

        parts.push({
          functionResponse: {
            name: call.name,
            response: { result: functionResponse },
          },
        });
      }

      result = await chat.sendMessage(parts);
      response = result.response;
      functionCalls = response.functionCalls();
    }

    return response.text();
  }
}
