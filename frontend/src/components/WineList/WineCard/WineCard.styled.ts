import FavoriteButton from '@/components/buttons/FavoriteButton';
import styled from 'styled-components';

export const StyledWineCardDiv = styled.div`
  position: relative;
  width: 100%;
  background: var(--white);
  padding: var(--space-md);
  transition: var(--transition);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--main-shadow);
  }
`;

export const WineImage = styled.img`
  width: 100%;
  height: 310px;
  object-fit: cover;
  margin-bottom: 32px;
`;

export const StyledFavoriteButton = styled(FavoriteButton)`
  position: absolute;
  top: 24px;
  right: 24px;
`;

export const WineTitle = styled.h3`
  text-align: center;
  font-weight: 600;
  color: var(--primary-gray);
  font-family: var(--font-main);
  margin-bottom: 16px;

  &:hover {
    text-decoration: underline;
    text-decoration-color: var(--primary-gray);
    text-underline-offset: 4px;
  }
`;

export const WineDescription = styled.p`
  text-align: center;
  color: var(--font-grey);
  font-family: var(--font-main);

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
