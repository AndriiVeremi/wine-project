import styled from 'styled-components';

import { breakpoints } from '@/styles/breakpoints';
import bgImage from '@/assets/about-bg-img.jpg';

export const Section = styled.section`
  margin-bottom: 40px;

  @media (min-width: ${breakpoints.tablet}) {
    margin-bottom: 48px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    margin-bottom: 64px;
  }
`;

export const SectionWithImage = styled(Section)`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  padding: 40px 0;

  @media (min-width: ${breakpoints.tablet}) {
    padding: 48px 0;
  }

  @media (min-width: ${breakpoints.desktop}) {
    padding: 64px 0;
  }
`;

export const SectionWithBg = styled(Section)`
  background-color: var(--footer-cream);
  padding: 40px 0;

  @media (min-width: ${breakpoints.tablet}) {
    padding: 48px 0;
  }

  @media (min-width: ${breakpoints.desktop}) {
    padding: 64px 0;
  }
`;

// about section
export const AboutContainer = styled.div`
  @media (min-width: ${breakpoints.tablet}) {
    display: flex;
    gap: 24px;
    flex-direction: column;
  }

  @media (min-width: ${breakpoints.desktop}) {
    flex-direction: row;
    gap: 64px;
  }
`;

export const FirstImgContainer = styled.div`
  display: none;

  @media (min-width: ${breakpoints.tablet}) {
    display: block;
    max-width: 480px;
    margin: 0 auto;
  }
  @media (min-width: ${breakpoints.desktop}) {
    max-width: 604px;
  }
`;

export const FirstImg = styled.img`
  width: 100%;
`;

export const AboutInfoContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: ${breakpoints.tablet}) {
    gap: 20px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    text-align: left;
    gap: 28px;
    max-width: 900px;
    line-height: 1.6;
  }
`;

// our mission section
export const OurMissionContainer = styled.div``;

export const TitleStyled = styled.h2`
  text-align: center;
  margin-bottom: 20px;

  @media (min-width: ${breakpoints.tablet}) {
    margin-bottom: 24px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    margin-bottom: 28px;
  }
`;

export const MissionText = styled.p`
  margin-bottom: 24px;
  text-align: center;

  @media (min-width: ${breakpoints.tablet}) {
    margin-bottom: 28px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    margin-bottom: 32px;
  }
`;

export const MissionHeading3 = styled.h3`
  text-align: center;
`;

export const FeaturesList = styled.div``;

export const FeatureCard = styled.div`
  width: 100%;
  padding: 24px;
`;

export const FeatureIcon = styled.div`
  font-size: 64px;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 96px;
  }

  @media (min-width: 1024px) {
    font-size: 123px;
  }
`;

export const FeatureText = styled.p``;
// section
