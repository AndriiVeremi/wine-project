import React from 'react';
import WineMiniCard from './WineMiniCard';
import TourMiniCard from './TourMiniCard';
import WineryMiniCard from './WineryMiniCard';
import { MessageText, CardsContainer } from './AIAssistantMessage.styled';

interface WineData {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  averageRating?: number;
  color?: string;
  sweetness?: string;
  vintage?: number;
}

interface TourData {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  averageRating?: number;
  duration?: number;
}

interface WineryData {
  _id: string;
  name: string;
  address: string;
  imageUrl?: string;
}

interface AIResponseData {
  text: string;
  wines?: WineData[];
  tours?: TourData[];
  wineries?: WineryData[];
}

interface AIAssistantMessageProps {
  content: string;
}

const AIAssistantMessage: React.FC<AIAssistantMessageProps> = ({ content }) => {
  let data: AIResponseData;

  try {
    const parsed = JSON.parse(content) as AIResponseData;
    data = {
      text: parsed.text || '',
      wines: parsed.wines || [],
      tours: parsed.tours || [],
      wineries: parsed.wineries || [],
    };
  } catch {
    data = { text: content, wines: [], tours: [], wineries: [] };
  }

  return (
    <div>
      <MessageText>{data.text}</MessageText>
      {(data.wines!.length > 0 || data.tours!.length > 0 || data.wineries!.length > 0) && (
        <CardsContainer>
          {data.wines?.map((wine) => (
            <WineMiniCard key={wine._id} wine={wine} />
          ))}
          {data.tours?.map((tour) => (
            <TourMiniCard key={tour._id} tour={tour} />
          ))}
          {data.wineries?.map((winery) => (
            <WineryMiniCard key={winery._id} winery={winery} />
          ))}
        </CardsContainer>
      )}
    </div>
  );
};

export default AIAssistantMessage;
