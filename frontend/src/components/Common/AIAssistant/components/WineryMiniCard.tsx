import React from 'react';
import { CardContainer, WineryImage, Content, Name, Address } from './WineryMiniCard.styled';

export interface WineryMiniCardProps {
  winery: {
    _id: string;
    name: string;
    address: string;
    imageUrl?: string;
  };
}

const WineryMiniCard: React.FC<WineryMiniCardProps> = ({ winery }) => {
  return (
    <CardContainer to={`/wineries/${winery._id}`}>
      <WineryImage src={winery.imageUrl || '/images/default-winery.png'} alt={winery.name} />
      <Content>
        <Name>{winery.name}</Name>
        <Address>{winery.address}</Address>
      </Content>
    </CardContainer>
  );
};

export default WineryMiniCard;
