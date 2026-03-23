import { FaMapMarkerAlt, FaTint, FaWineBottle } from 'react-icons/fa';
import { CgSandClock } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import type { Grape } from '@/types/grape';
import { stripHtml } from '@/utils/text';
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

interface Props {
  grape: Grape;
}

const GrapeCard = ({ grape }: Props) => {
  const navigate = useNavigate();
  const regions = grape.regions?.map((r) => r.name).join(', ') || 'Global';
  const img = grape.imageUrls?.[0] || '/assets/grape-placeholder.png';

  const typeColor =
    grape.type === 'red' ? '#841013' : grape.type === 'white' ? '#d4af37' : '#ffb7c5';

  return (
    <StyledGrapeCardDiv
      onClick={() => navigate(`/grapes/${grape._id}`)}
      style={{ cursor: 'pointer' }}
    >
      <div
        style={{
          position: 'absolute',
          top: '15px',
          right: '15px',
          backgroundColor: typeColor,
          color: '#fff',
          padding: '2px 8px',
          borderRadius: '4px',
          fontSize: '10px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          zIndex: 1,
        }}
      >
        {grape.type}
      </div>

      <GrapeImage src={img} alt={grape.name} />
      <GrapeTitle>{grape.name}</GrapeTitle>

      <RegionContainer>
        <FaMapMarkerAlt size={12} color="var(--primary-wine, #841013)" />
        <RegionText>{regions}</RegionText>
      </RegionContainer>

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
          <CgSandClock size={14} color="#E3900A" />
          <span>{grape.agingPotential}.o.</span>
        </CharacteristicItem>
      </CharacteristicsContainer>

      <GrapeDescription>{stripHtml(grape.description || '')}</GrapeDescription>
    </StyledGrapeCardDiv>
  );
};

export default GrapeCard;
