import styled from 'styled-components';
import { breakpoints } from '@/styles/breakpoints';
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
      'tabs info'
      'content info';
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
    position: sticky;
    top: 100px;
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
    }
  }
  @media (min-width: ${breakpoints.desktop}) {
    grid-area: tabs;
    order: unset;
    margin-top: 40px;
  }
`;
export const WineDescriptionContent = styled.div`
  font-family: var(--font-main);
  font-size: 16px;
  line-height: 1.6;
  color: var(--primary-gray);
  max-width: 100%;
  order: 4;
  background: #fff;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  @media (min-width: ${breakpoints.tablet}) {
    font-size: 18px;
    line-height: 1.8;
    padding: 32px;
  }
  @media (min-width: ${breakpoints.desktop}) {
    grid-area: content;
    order: unset;
  }
  p {
    margin-bottom: 20px;
  }
  .description-title {
    margin-top: 24px;
    font-weight: 500;
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
