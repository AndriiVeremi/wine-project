import { Link } from 'react-router-dom';
import type { Wine } from '@/types/wine';

interface WineCardProps {
  wine: Wine;
}

const WineCard = ({ wine }: WineCardProps) => {
  return (
    <div className="wine-card">
      <Link to={`/wines/${wine._id}`} className="wine-card__link">
        <img src={wine.imageUrl} alt={wine.name} />
        <h3>{wine.name}</h3>
      </Link>

      <p>{wine.color}</p>
      <p>{wine.price} £</p>
    </div>
  );
};

export default WineCard;
