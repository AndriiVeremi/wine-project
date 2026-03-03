import type { Wine } from '@/types/wine';
import WineCard from './WineCard/WineCard';

interface WineListProps {
  wines: Wine[];
}

const WineList = ({ wines }: WineListProps) => {
  return (
    <ul>
      {wines.map((wine: Wine) => (
        <WineCard key={wine._id} wine={wine} />
      ))}
    </ul>
  );
};

export default WineList;
