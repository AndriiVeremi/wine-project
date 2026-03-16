import styled from 'styled-components';
import { breakpoints } from '@/styles/breakpoints';

export const TourDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 40px 0;

  @media (min-width: ${breakpoints.desktop}) {
    flex-direction: row;
    align-items: flex-start;
    gap: 48px;
  }
`;

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const GallerySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const MainBanner = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--main-shadow);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (min-width: ${breakpoints.tablet}) {
    height: 450px;
  }
`;

export const ThumbnailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
`;

export const Thumbnail = styled.div<{ $active: boolean }>`
  aspect-ratio: 1 / 1;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  border: 3px solid ${({ $active }) => ($active ? 'var(--primary-wine)' : 'transparent')};
  transition: var(--transition);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const TourHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const TourTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: var(--black-color);
  line-height: 1.2;

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 42px;
  }
`;

export const TourSubtitle = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: var(--secondary-gray);
  font-size: 16px;
`;

export const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 24px;
  background: var(--white);
  border-radius: 20px;
  border: 1px solid var(--tertiary-gray);

  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const SpecItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  text-align: center;

  .icon {
    width: 40px;
    height: 40px;
    background: var(--bg-main);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary-wine);
    font-size: 20px;
  }

  .label {
    font-size: 12px;
    color: var(--secondary-gray);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .value {
    font-size: 16px;
    font-weight: 600;
    color: var(--black-color);
  }
`;

export const DescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  h2 {
    font-size: 24px;
    font-weight: 700;
    color: var(--black-color);
  }

  p {
    font-size: 16px;
    line-height: 1.6;
    color: var(--primary-gray);
  }
`;

export const Sidebar = styled.aside`
  width: 100%;
  position: sticky;
  top: 100px;

  @media (min-width: ${breakpoints.desktop}) {
    width: 380px;
  }
`;

export const BookingCard = styled.div`
  background: var(--white);
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--tertiary-gray);
  display: flex;
  flex-direction: column;
  gap: 24px;

  button {
    align-self: center;
    width: 100%;
    max-width: 280px;
  }
`;

export const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  .label {
    font-size: 16px;
    color: var(--secondary-gray);
  }

  .amount {
    font-size: 32px;
    font-weight: 700;
    color: var(--primary-wine);
  }
`;

export const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
  color: var(--primary-gray);

  svg {
    color: #4caf50;
    flex-shrink: 0;
  }
`;
