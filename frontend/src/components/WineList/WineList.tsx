import type { Wine } from '@/types/wine';
import WineCard from './WineCard/WineCard';

interface WineListProps {
  wines: Wine[];
}

const WineList = ({ wines }: WineListProps) => {
  return (
    <ul>
      {wines.map((wine) => (
        <li key={wine._id}>
          <WineCard wine={wine} />
        </li>
      ))}
    </ul>
  );
};

export default WineList;
