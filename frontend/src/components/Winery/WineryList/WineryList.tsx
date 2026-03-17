import type { Winery } from '@/types/wineries';
import WineryCard from './WineryCard/WineryCard';
import { StyledWineryList, EmptyMessage } from './WineryList.styled';

interface WineryListProps {
  wineries: Winery[];
}

const WineryList = ({ wineries }: WineryListProps) => {
  if (wineries.length === 0) {
    return <EmptyMessage>No wineries found.</EmptyMessage>;
  }

  return (
    <StyledWineryList>
      {wineries.map((winery) => (
        <li key={winery._id}>
          <WineryCard winery={winery} />
        </li>
      ))}
    </StyledWineryList>
  );
};

export default WineryList;
