import { Link } from 'react-router-dom';
import type { Wine } from '@/types/wine';
import { StyledWineCardDiv, WineImage, WineDescription, WineTitle } from './WineCard.styled';

interface WineCardProps {
  wine: Wine;
}

const WineCard = ({ wine }: WineCardProps) => {
  return (
    <StyledWineCardDiv>
      <Link to={`/wines/${wine._id}`}>
        <WineImage src={wine.imageUrl} alt={wine.name} />
      </Link>

      <Link to={`/wines/${wine._id}`}>
        <WineTitle>{wine.name}</WineTitle>
      </Link>

      <WineDescription>{wine.description}</WineDescription>
    </StyledWineCardDiv>
  );
};

export default WineCard;
