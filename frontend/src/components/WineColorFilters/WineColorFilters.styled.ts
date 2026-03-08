import styled from 'styled-components';

export const ImageList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 60px;
`;

export const WineImageItem = styled.li`
  cursor: pointer;
  transition: transform var(--transition);

  &:hover {
    transform: scale(1.05);
  }
`;

export const WineImage = styled.img`
  height: 220px;
  object-fit: cover;
`;
