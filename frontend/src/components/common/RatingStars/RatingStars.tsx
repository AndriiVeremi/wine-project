import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import { StarsWrapper, RatingTextLeft, RatingTextRight } from './RatingStars.styled';

interface RatingStarsProps {
  value: number;
  reviews?: number;
  showLeftValue?: boolean;
  showRightReviews?: boolean;
  size?: number;
  color?: string;
}

const RatingStars = ({
  value,
  reviews,
  showLeftValue = false,
  showRightReviews = false,
  size = 20,
  color = 'var(--star-main)',
}: RatingStarsProps) => {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const diff = value - i;

    if (diff >= 1) return 'full';
    if (diff > 0) return 'half';
    return 'empty';
  });

  return (
    <StarsWrapper>
      {showLeftValue && <RatingTextLeft>{value.toFixed(1)}</RatingTextLeft>}

      {stars.map((type, i) => {
        if (type === 'full') return <FaStar key={i} size={size} color={color} />;

        if (type === 'half') return <FaStarHalfAlt key={i} size={size} color={color} />;

        return <FaRegStar key={i} size={size} color={color} />;
      })}

      {showRightReviews && reviews !== undefined && <RatingTextRight>({reviews})</RatingTextRight>}
    </StarsWrapper>
  );
};

export default RatingStars;
