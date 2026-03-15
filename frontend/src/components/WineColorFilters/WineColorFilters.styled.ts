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

  @media (max-width: 1024px) {
    gap: 40px;
  }

  @media (max-width: 767px) {
    gap: 20px;
    padding: 0 10px;
  }

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

export const WineImageItem = styled.li`
  cursor: pointer;
  transition: transform var(--transition);

  @media (max-width: 767px) {
    flex: 0 1 calc(50% - 10px); /* Exactly two items per row minus half of the 20px gap */
    display: flex;
    justify-content: center;
  }

  @media (max-width: 480px) {
    flex: 0 1 calc(50% - 5px); /* Exactly two items per row minus half of the 10px gap */
  }

  &:hover {
    transform: scale(1.1);
  }
`;

export const WineImage = styled.img`
  height: 280px;
  object-fit: contain;

  @media (max-width: 1024px) {
    height: 220px;
  }

  @media (max-width: 767px) {
    height: auto;
    width: 100%;
    max-height: 250px;
  }

  @media (max-width: 480px) {
    max-height: 200px;
  }
`;
