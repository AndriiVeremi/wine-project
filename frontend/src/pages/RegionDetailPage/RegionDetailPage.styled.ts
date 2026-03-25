import styled from 'styled-components';
import { breakpoints } from '@/styles/breakpoints';

export const StyledRegionWrapper = styled.div`
  width: 100%;
  padding-top: 40px;
  padding-bottom: 0;
`;

export const StyledRegionHero = styled.section`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 50px;

  @media (min-width: ${breakpoints.tablet}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    align-items: start;
  }

  @media (min-width: ${breakpoints.desktop}) {
    gap: 48px;
  }
`;

export const StyledRegionImg = styled.div`
  width: 100%;
  height: auto;
  min-height: 250px;
  max-height: 350px;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.01);
  }

  @media (min-width: ${breakpoints.tablet}) {
    max-height: 500px;
    min-height: 400px;
  }

  img {
    width: 100%;
    height: 100%;
    max-height: 350px;
    object-fit: contain;
    display: block;

    @media (min-width: ${breakpoints.tablet}) {
      max-height: 500px;
    }
  }
`;

export const StyledImageModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  cursor: zoom-out;
  padding: 20px;
`;

export const StyledModalImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  cursor: default;
`;

export const StyledCloseModal = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 40px;
  cursor: pointer;
  line-height: 1;
  padding: 10px;
  transition: color 0.2s ease;

  &:hover {
    color: #841013;
  }
`;

export const StyledNoImg = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #841013 0%, #4a0608 100%);
  color: white;
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  padding: 20px;
  text-transform: uppercase;
`;

export const StyledRegionInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StyledTitleWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
`;

export const StyledRegionLabel = styled.span`
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: #841013;
  text-transform: uppercase;

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 36px;
  }
`;

export const StyledRegionTitle = styled.h1`
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: #841013;
  margin: 0;

  text-transform: uppercase;

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 36px;
  }
`;

export const StyledText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #444;
  margin: 0;
`;

export const StyledSection = styled.div`
  margin-top: 10px;

  h3 {
    font-family: 'Montserrat Alternates', sans-serif;
    font-size: 24px;
    font-weight: 600;
    color: #841013;
    margin-bottom: 12px;
  }

  p {
    font-size: 16px;
    line-height: 1.6;
    color: #444;
    margin-bottom: 10px;
  }

  ul {
    list-style: disc;
    padding-left: 20px;
    color: #555;
  }

  li {
    margin-bottom: 6px;
    font-size: 14px;
  }
`;

export const StyledRegionGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media (min-width: ${breakpoints.tablet}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    gap: 48px;
  }
`;

export const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const StyledBlock = styled.div`
  h2 {
    font-family: 'Montserrat Alternates', sans-serif;
    font-size: 28px;
    font-weight: 600;
    color: #841013;
    margin-bottom: 15px;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }

  p {
    font-size: 16px;
    line-height: 1.6;
    color: #444;
    margin-bottom: 15px;
  }

  ul {
    list-style: disc;
    padding-left: 20px;
    color: #555;
  }

  li {
    margin-bottom: 8px;
    font-size: 14px;
  }
`;

export const StyledGrapeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

export const StyledGrapeItem = styled.div`
  h4 {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 10px;
    font-size: 14px;
    color: #555;

    strong {
      color: #841013;
      display: block;
    }
  }
`;

export const StyledTagsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

export const StyledTag = styled.span`
  background: #f8f1f1;
  color: #841013;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid #ebdada;
`;

export const StyledWineriesWines = styled.section`
  margin-top: 80px;
`;

export const StyledTitle = styled.h2`
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 32px;
  font-weight: 600;
  color: #841013;
  text-align: center;
  margin-bottom: 0;
  text-transform: uppercase;
`;

export const StyledTabs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  gap: 12px;
  width: 100%;
  margin-top: 110px;
  margin-bottom: 90px;

  & > button {
    flex: 1;
  }

  @media (min-width: ${breakpoints.tablet}) {
    gap: 24px;
  }
`;

export const SkeletonGrid = styled.div`
  display: flex;
  gap: 20px;
  overflow: hidden;
  justify-content: center;
  width: 100%;

  & > div {
    display: flex;
    gap: 20px;
    width: 100%;
    justify-content: center;
  }
`;
