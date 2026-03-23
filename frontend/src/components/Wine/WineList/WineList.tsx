import type { Wine } from '@/types/wine';
import WineCard from './WineCard/WineCard';
import { StyledWineList, StyledWineListItem } from './WineList.styled';

interface WineListProps {
  wines: Wine[];
}

const WineList = ({ wines }: WineListProps) => {
  return (
    <StyledWineList>
      {wines.map((wine, index) => (
        <StyledWineListItem key={wine._id}>
          <WineCard wine={wine} isFirst={index === 0} />
        </StyledWineListItem>
      ))}
    </StyledWineList>
  );
};

export default WineList;
