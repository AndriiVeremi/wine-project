import { FaMapMarkerAlt, FaTint, FaWineBottle, FaClock } from 'react-icons/fa';
import type { Grape } from '@/types/grape';
import {
  StyledGrapeCardDiv,
  GrapeImage,
  GrapeTitle,
  RegionContainer,
  RegionText,
  GrapeDescription,
  CharacteristicsContainer,
  CharacteristicItem,
} from './GrapeCard.styled';

interface GrapeCardProps {
  grape: Grape;
}

const GrapeCard = ({ grape }: GrapeCardProps) => {
  const regionNames = grape.regions?.map((r) => r.name).join(', ') || 'No region';
  const displayImage =
    grape.imageUrls && grape.imageUrls.length > 0
      ? grape.imageUrls[0]
      : 'https://placehold.co/400x600/EEE/31343C?text=No_Image';

  return (
    <StyledGrapeCardDiv>
      <GrapeImage src={displayImage} alt={grape.name} />
      <GrapeTitle>{grape.name}</GrapeTitle>

      <RegionContainer>
        <FaMapMarkerAlt size={14} color="#841013" />
        <RegionText>{regionNames}</RegionText>
      </RegionContainer>

      {/* Basic characteristics section */}
      <CharacteristicsContainer>
        <CharacteristicItem title="Acidity">
          <FaTint size={14} color="#5B9BD5" />
          <span>{grape.acidity}</span>
        </CharacteristicItem>
        <CharacteristicItem title="Body">
          <FaWineBottle size={14} color="#841013" />
          <span>{grape.body}</span>
        </CharacteristicItem>
        <CharacteristicItem title="Aging">
          <FaClock size={14} color="#7F7F7F" />
          <span>{grape.agingPotential}</span>
        </CharacteristicItem>
      </CharacteristicsContainer>

      <GrapeDescription>{grape.description}</GrapeDescription>
    </StyledGrapeCardDiv>
  );
};

export default GrapeCard;
