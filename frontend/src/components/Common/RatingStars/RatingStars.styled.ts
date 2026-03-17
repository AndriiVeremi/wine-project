import styled from 'styled-components';

export const StarsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: flex-start;
`;

export const RatingTextLeft = styled.span`
  color: var(--black);
  font-weight: 600;
  font-size: 18px;
  margin-right: 4px;
`;

export const RatingTextRight = styled.span`
  color: var(--secondary-gray);
`;
