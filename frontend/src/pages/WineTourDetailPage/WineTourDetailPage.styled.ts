import styled from 'styled-components';
import { breakpoints } from '@/styles/breakpoints';
import { richTextStyles } from '@/components/Common/ListStyles/RichTextContent.styled';

export const TourDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-bottom: 80px;

  @media (min-width: ${breakpoints.desktop}) {
    display: grid;
    grid-template-columns: 1fr 400px;
    grid-template-areas:
      'header header'
      'gallery sidebar'
      'specs specs'
      'highlights highlights'
      'content content';
    gap: 60px 60px;
  }
`;

export const TourHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media (min-width: ${breakpoints.desktop}) {
    grid-area: header;
  }
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

export const GallerySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (min-width: ${breakpoints.desktop}) {
    grid-area: gallery;
  }
`;

export const MainBanner = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);

  @media (min-width: ${breakpoints.tablet}) {
    height: 450px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    height: 550px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ThumbnailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  width: 100%;
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

export const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 32px;
  background: #fdfcfb;
  border-radius: 24px;
  border: 1px solid #f1ece9;

  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: ${breakpoints.desktop}) {
    grid-area: specs;
    margin-top: 20px;
  }
`;

export const SpecItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  text-align: center;
  padding: 16px;
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
  }

  .icon {
    width: 54px;
    height: 54px;
    background: #fff;
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary-wine);
    font-size: 24px;
    box-shadow: 0 8px 20px rgba(132, 16, 19, 0.08);
  }
  .label {
    font-size: 11px;
    color: #999;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-weight: 700;
  }
  .value {
    font-size: 17px;
    font-weight: 700;
    color: var(--black-color);
  }
`;

export const HighlightCard = styled.div`
  background: linear-gradient(135deg, #fffcfc 0%, #faf5f5 100%);
  padding: 40px;
  border-radius: 32px;
  border-left: 6px solid var(--primary-wine);
  box-shadow: 0 15px 40px rgba(132, 16, 19, 0.04);
  margin-bottom: 20px;

  h2 {
    color: var(--primary-wine);
    font-size: 26px;
    margin-bottom: 24px;
    font-family: 'Montserrat Alternates', sans-serif;
  }

  @media (min-width: ${breakpoints.desktop}) {
    grid-area: highlights;
  }
`;

export const DescriptionBox = styled.div`
  ${richTextStyles}
  display: flex;
  flex-direction: column;

  @media (min-width: ${breakpoints.desktop}) {
    grid-area: content;
  }
`;

export const Sidebar = styled.aside`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 80px;

  @media (min-width: ${breakpoints.desktop}) {
    grid-area: sidebar;
  }
`;

export const BookingCard = styled.div`
  display: none;
  background: var(--white);
  border-radius: 32px;
  padding: 40px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--tertiary-gray);
  flex-direction: column;
  gap: 32px;
  position: sticky;
  top: 120px;

  @media (min-width: ${breakpoints.desktop}) {
    display: flex;
  }

  .guarantee-box {
    background: #f8fafc;
    padding: 16px;
    border-radius: 16px;
    font-size: 13px;
    color: #64748b;
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid #f1f5f9;
  }

  button {
    width: 100%;
    height: 60px;
    font-size: 18px;
  }
`;

export const MobileBookingCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
  background: var(--white);
  border-radius: 20px;
  border: 1px solid var(--tertiary-gray);
  box-shadow: var(--main-shadow);
  @media (min-width: ${breakpoints.desktop}) {
    display: none;
  }
  button {
    width: 100%;
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
  strong {
    color: var(--black-color);
  }
`;

export const SliderSection = styled.section`
  margin-top: 60px;
  margin-bottom: 60px;
  @media (min-width: ${breakpoints.desktop}) {
    grid-column: 1 / -1;
  }
`;

export const SectionHeaderTitle = styled.h2`
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 32px;
  font-weight: 500;
  color: var(--accent-color, #841013);
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 40px;
  @media (min-width: ${breakpoints.tablet}) {
    font-size: 49px;
  }
`;
