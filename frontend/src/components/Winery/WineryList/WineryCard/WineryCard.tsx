import { useNavigate } from 'react-router-dom';
import type { Winery } from '@/types/wineries';
import {
  StyledWineryCardDiv,
  WineryLogo,
  WineryTitle,
  WineryInfo,
  IconWithText,
  WineryLink,
  RatingWrapper,
} from './WineryCard.styled';
import RatingStars from '@/components/Common/RatingStars';
import VIPBadge from '@/components/Common/VIPBadge';
import { HiMapPin, HiGlobeAlt } from 'react-icons/hi2';

interface WineryCardProps {
  winery: Winery;
}

const WineryCard = ({ winery }: WineryCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/wineries/${winery._id}`);
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <StyledWineryCardDiv onClick={handleCardClick}>
      {winery.isVip && <VIPBadge size={60} style={{ position: 'absolute', top: 0, left: 0 }} />}

      <WineryLogo src={winery.logoUrl || '/assets/winery-placeholder.png'} alt={winery.name} />

      <RatingWrapper>
        <RatingStars
          value={winery.averageRating ?? 0}
          showLeftValue={true}
          showRightReviews={true}
          size={16}
        />
      </RatingWrapper>

      <WineryTitle>{winery.name}</WineryTitle>

      <IconWithText>
        <HiMapPin size={18} color="var(--accent-color, #e44848)" />
        {winery.address || 'Region not specified'}
      </IconWithText>

      <IconWithText>
        <HiGlobeAlt size={18} color="var(--accent-color, #e44848)" />
        <WineryLink href={`/wineries/${winery._id}`} onClick={handleLinkClick}>
          View Winery Page
        </WineryLink>
      </IconWithText>

      <WineryInfo>{winery.history || 'No history available.'}</WineryInfo>
    </StyledWineryCardDiv>
  );
};

export default WineryCard;
