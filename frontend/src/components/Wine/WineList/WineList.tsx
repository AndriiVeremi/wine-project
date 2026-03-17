import type { Wine } from '@/types/wine';
import WineCard from './WineCard/WineCard';
import { StyledWineList, StyledWineListItem } from './WineList.styled';

interface WineListProps {
  wines: Wine[];
}

const WineList = ({ wines }: WineListProps) => {
  return (
    <StyledWineList>
      {wines.map((wine) => (
        <StyledWineListItem key={wine._id}>
          <WineCard wine={wine} />
        </StyledWineListItem>
      ))}
    </StyledWineList>
  );
};

export default WineList;
