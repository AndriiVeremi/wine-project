import styled from 'styled-components';
import { breakpoints } from '@/styles/breakpoints';
import { richTextStyles } from '@/components/Common/ListStyles/RichTextContent.styled';

export const StyledWinePageDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  @media (min-width: ${breakpoints.desktop}) {
    display: grid;
    grid-template-columns: 1fr 500px;
    grid-template-areas:
      'image info'
      'tabs tabs'
      'content content';
    gap: 40px 40px;
    align-items: start;
  }
`;
export const StyledWraperImage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  order: 1;
  @media (min-width: ${breakpoints.desktop}) {
    grid-area: image;
    order: unset;
  }
`;
export const StyledWineInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  order: 2;
  background: #fff;
  border-radius: 16px;

  @media (min-width: ${breakpoints.desktop}) {
    grid-area: info;
    order: unset;
    height: 100%;
  }
`;
export const StyledWineImg = styled.img`
  width: 100%;
  height: 450px;
  object-fit: contain;
  background-color: #fff;
  border-radius: 16px;
  padding: 20px;
  border: 1px solid #f0f0f0;
  @media (min-width: ${breakpoints.tablet}) {
    height: 550px;
  }
  @media (min-width: ${breakpoints.desktop}) {
    height: 700px;
  }
`;
export const WineDetailPageTabs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  order: 3;
  button {
    width: 100%;
  }
  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
    gap: 24px;
    button {
      width: auto;
      min-width: 350px;
    }
  }
  @media (min-width: ${breakpoints.desktop}) {
    grid-area: tabs;
    order: unset;
    margin-top: 40px;
    justify-content: center;
    button {
      min-width: 316px;
    }
  }
`;

export const WineDescriptionContent = styled.div`
  ${richTextStyles}
  max-width: 100%;
  order: 4;
  background: #fff;

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 18px;
    line-height: 1.8;
  }
  @media (min-width: ${breakpoints.desktop}) {
    grid-area: content;
    order: unset;
  }
  .description-title {
    margin-top: 24px;
    font-weight: 500;
    color: var(--black);
    @media (min-width: ${breakpoints.tablet}) {
      margin-top: 32px;
    }
  }
  .description-label {
    font-weight: 700;
    color: var(--black);
    margin-right: 8px;
  }
`;

export const WineProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin: 30px 0;
  padding: 32px;
  background: #fdfcfb;
  border-radius: 20px;
  border: 1px solid #f1ece9;

  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const ProfileItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .label-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .label {
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--secondary-gray);
    letter-spacing: 1px;
  }

  .value {
    font-size: 14px;
    font-weight: 500;
    color: var(--primary-wine);
  }
`;

export const CharacterBar = styled.div<{ $percent: number }>`
  width: 100%;
  height: 6px;
  background: #ececec;
  border-radius: 3px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${(props) => props.$percent}%;
    background: var(--primary-wine);
    border-radius: 3px;
    transition: width 0.5s ease-out;
  }
`;

export const SommelierCard = styled.div`
  background: linear-gradient(135deg, #fffcfc 0%, #faf5f5 100%);
  padding: 32px;
  border-radius: 24px;
  border-left: 5px solid var(--primary-wine);
  margin-bottom: 40px;
  box-shadow: 0 10px 30px rgba(132, 16, 19, 0.03);

  h3 {
    color: var(--primary-wine);
    font-size: 22px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: 'Montserrat Alternates', sans-serif;
  }

  .note-item {
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    gap: 4px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .note-label {
    font-weight: 700;
    font-size: 12px;
    text-transform: uppercase;
    color: #999;
    letter-spacing: 0.5px;
  }

  .note-text {
    font-size: 17px;
    color: var(--primary-gray);
    line-height: 1.5;
  }
`;

export const ServingSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
`;

export const ServingItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--primary-gray);
  font-size: 15px;

  svg {
    color: var(--primary-wine);
  }
`;
export const SliderSection = styled.section`
  margin-top: 60px;
  margin-bottom: 80px;
  width: 100%;
  @media (min-width: ${breakpoints.tablet}) {
    margin-top: 100px;
    margin-bottom: 120px;
  }
`;
export const SliderTitle = styled.h2`
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
