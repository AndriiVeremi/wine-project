import type { Grape } from '@/types/grape';
import GrapeCard from './GrapeCard/GrapeCard';
import { StyledGrapeList, StyledGrapeListItem } from './GrapeList.styled';

interface GrapeListProps {
  grapes: Grape[];
}

const GrapeList = ({ grapes }: GrapeListProps) => {
  return (
    <StyledGrapeList>
      {grapes.map((grape) => (
        <StyledGrapeListItem key={grape._id}>
          <GrapeCard grape={grape} />
        </StyledGrapeListItem>
      ))}
    </StyledGrapeList>
  );
};

export default GrapeList;
