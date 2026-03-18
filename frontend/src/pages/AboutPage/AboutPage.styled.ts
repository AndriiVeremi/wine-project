import styled from 'styled-components';
import AboutFirstImg from '@/assets/about-first.png';
import AboutSecondImg from '@/assets/about-second.png';
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

export const SectionWithBg = styled.section`
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
  width: 100%;
  display: none;
  background-image: url(${AboutFirstImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (min-width: ${breakpoints.tablet}) {
    display: block;
    max-width: 480px;
    aspect-ratio: 1 / 1;
    margin: 0 auto;
  }

  @media (min-width: ${breakpoints.desktop}) {
    max-width: 604px;
    aspect-ratio: 1 / 1;
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
  margin-bottom: 24px;

  @media (min-width: ${breakpoints.tablet}) {
    margin-bottom: 28px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    margin-bottom: 32px;
  }
`;

export const FeaturesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: ${breakpoints.tablet}) {
    gap: 24px;
    flex-direction: row;
    flex-wrap: wrap;
  }

  @media (min-width: ${breakpoints.desktop}) {
    gap: 28px;
  }
`;

export const FeatureCard = styled.div`
  width: 100%;
  padding: 24px;
  border: 1px solid #cbcbcb;
  border-radius: 18px;

  @media (min-width: ${breakpoints.tablet}) {
    flex-basis: calc((100% - 24px) / 2);
  }

  @media (min-width: ${breakpoints.desktop}) {
    flex-basis: calc((100% - 84px) / 4);
  }
`;

export const FeatureIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 64px;
  color: var(--primary-wine);
  margin-bottom: 40px;

  @media (min-width: 768px) {
    font-size: 96px;
    margin-bottom: 48px;
  }

  @media (min-width: 1024px) {
    font-size: 123px;
    margin-bottom: 56px;
  }
`;

export const FeatureText = styled.p`
  text-align: center;
`;
// section find

export const FindSection = styled.div`
  color: var(--white);
`;

export const FindTitle = styled.h2`
  color: var(--white);
  text-align: center;
  margin-bottom: 24px;

  @media (min-width: ${breakpoints.tablet}) {
    margin-bottom: 28px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    margin-bottom: 32px;
  }
`;

export const FindHeadingSecond = styled.p`
  text-align: center;
  margin-bottom: 28px;

  @media (min-width: ${breakpoints.tablet}) {
    margin-bottom: 32px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    margin-bottom: 36px;
  }
`;

export const FindList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;

  @media (min-width: ${breakpoints.tablet}) {
    gap: 24px;
    flex-direction: row;
    flex-wrap: wrap;
  }

  @media (min-width: ${breakpoints.desktop}) {
    gap: 28px;
  }
`;

export const FindItem = styled.div`
  flex-basis: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;

  @media (min-width: ${breakpoints.tablet}) {
    flex-basis: calc((100% - 48px) / 3);
    gap: 20px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    flex-basis: calc((100% - 112px) / 5);
    gap: 24px;
  }
`;

export const FindIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 64px;

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 72px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    font-size: 80px;
  }
`;

export const FindText = styled.p`
  text-align: center;
`;

// audience section
export const AudienceSection = styled.div``;

export const AudienceContent = styled.div``;

export const AudienceTitle = styled.h2``;

export const AudienceText = styled.p``;

export const AudienceList = styled.ul``;

export const AudienceSubList = styled.ul``;

export const AudienceImageContainer = styled.div`
  background-image: url(${AboutSecondImg});
`;

export const AudienceItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

export const AudienceIcon = styled.div`
  font-size: 20px;
  color: var(--primary-wine);
  line-height: 1;
  margin-top: 4px;
`;

export const AudienceSubItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

export const AudienceIconSmall = styled.div`
  font-size: 16px;
  color: var(--primary-wine);
  line-height: 1;
  margin-top: 4px;
`;
