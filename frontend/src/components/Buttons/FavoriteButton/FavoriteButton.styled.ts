import styled from 'styled-components';

export const StyledFavoriteButton = styled.button`
  border: none;
  cursor: pointer;
  padding: 4px;
  transition: var(--transition);

  &:hover {
    transform: scale(1.1);
  }
`;
