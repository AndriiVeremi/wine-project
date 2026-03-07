import styled from 'styled-components';

export const StyledWineCardDiv = styled.div`
  width: 100%;
  background: var(--white);
  padding: var(--space-md);
  //   position: relative;
  transition: var(--transition);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.15);
  }
`;

export const WineImage = styled.img`
  width: 100%;
  height: 310px;
  object-fit: cover;
  margin-bottom: 32px;
`;

export const VipBadge = styled.div`
  position: absolute;
  top: var(--space-xs);
  left: var(--space-xs);
  background: var(--wine-gradient);
  color: var(--white);
  padding: 4px 10px;
  border-radius: var(--border-radius-sm);
  font-size: 12px;
  font-weight: 600;
  font-family: var(--font-main);
`;

export const FavoriteButton = styled.button`
  position: absolute;
  top: var(--space-xs);
  right: var(--space-xs);
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 22px;
  color: var(--black-icon);
  transition: var(--transition);

  &:hover {
    color: var(--primary-wine);
  }
`;

export const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: var(--star-main);
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
`;
