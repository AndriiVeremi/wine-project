import type { Wine } from '@/types/wine';

interface WineCardProps {
  wine: Wine;
}

const WineCard = ({ wine }: WineCardProps) => {
  return (
    <li>
      <img src={wine.imageUrl} alt={wine.name} />
      <h3>{wine.name}</h3>
      <p>{wine.color}</p>
      <p>{wine.price} £</p>
    </li>
  );
};

export default WineCard;
