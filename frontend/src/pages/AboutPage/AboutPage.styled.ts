import styled from 'styled-components';
import AboutFirstImg from '@/assets/about-first.webp';
import AboutSecondImg from '@/assets/about-second.webp';
import { breakpoints } from '@/styles/breakpoints';
import bgImage from '@/assets/about-bg-img.webp';

export const AboutPageWrapper = styled.div`
  padding: 80px 0;

  @media (max-width: 767px) {
    padding: 40px 0;
  }
`;

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

  h2 {
    font-size: 28px;
    color: var(--primary-wine);
    margin-bottom: 8px;
  }

  p {
    font-size: 16px;
    line-height: 1.6;
    color: #444;
  }

  @media (min-width: ${breakpoints.tablet}) {
    gap: 20px;
    h2 {
      font-size: 32px;
    }
    p {
      font-size: 18px;
    }
  }

  @media (min-width: ${breakpoints.desktop}) {
    text-align: left;
    gap: 28px;
    max-width: 900px;
    h2 {
      font-size: 40px;
    }
  }
`;

// our mission section
export const OurMissionContainer = styled.div``;

export const TitleStyled = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 28px;

  @media (min-width: ${breakpoints.tablet}) {
    margin-bottom: 24px;
    font-size: 32px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    margin-bottom: 28px;
    font-size: 40px;
  }
`;

export const MissionText = styled.p`
  margin-bottom: 24px;
  text-align: center;
  font-size: 16px;
  line-height: 1.6;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: ${breakpoints.tablet}) {
    margin-bottom: 28px;
    font-size: 18px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    margin-bottom: 32px;
    font-size: 20px;
  }
`;

export const MissionHeading3 = styled.h3`
  text-align: center;
  margin-bottom: 24px;
  font-size: 22px;
  color: var(--primary-wine);

  @media (min-width: ${breakpoints.tablet}) {
    margin-bottom: 28px;
    font-size: 24px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    margin-bottom: 32px;
    font-size: 28px;
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
  background: #fff;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: var(--primary-wine);
  }

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
  margin-bottom: 20px;

  @media (min-width: 768px) {
    font-size: 72px;
    margin-bottom: 24px;
  }

  @media (min-width: 1024px) {
    font-size: 80px;
    margin-bottom: 30px;
  }
`;

export const FeatureText = styled.p`
  text-align: center;
  font-size: 15px;
  line-height: 1.5;
  color: #333;

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 16px;
  }
`;
// section find

export const FindSection = styled.div`
  color: var(--white);
`;

export const FindTitle = styled.h2`
  color: var(--white);
  text-align: center;
  margin-bottom: 24px;
  font-size: 28px;

  @media (min-width: ${breakpoints.tablet}) {
    margin-bottom: 28px;
    font-size: 32px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    margin-bottom: 32px;
    font-size: 40px;
  }
`;

export const FindHeadingSecond = styled.p`
  text-align: center;
  margin-bottom: 28px;
  font-size: 18px;
  font-weight: 500;

  @media (min-width: ${breakpoints.tablet}) {
    margin-bottom: 32px;
    font-size: 20px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    margin-bottom: 36px;
    font-size: 22px;
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
  font-size: 48px;

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 56px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    font-size: 64px;
  }
`;

export const FindText = styled.p`
  text-align: center;
  font-size: 14px;
  line-height: 1.4;

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 16px;
  }
`;

// audience section
export const AudienceSection = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${breakpoints.desktop}) {
    flex-direction: row;
    align-items: flex-start;
    gap: 40px;
  }
`;

export const AudienceContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: ${breakpoints.tablet}) {
    gap: 20px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    gap: 24px;
  }
`;

export const AudienceTitle = styled.h2`
  text-align: center;
  font-size: 28px;

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 32px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    text-align: left;
    font-size: 40px;
  }
`;

export const AudienceText = styled.p`
  font-size: 16px;
  line-height: 1.6;

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 18px;
  }
`;

export const AudienceList = styled.ul`
  padding-left: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (min-width: ${breakpoints.tablet}) {
    gap: 10px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    gap: 12px;
  }
`;

export const AudienceSubList = styled.ul`
  padding-left: 32px;
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media (min-width: ${breakpoints.tablet}) {
    gap: 8px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    gap: 10px;
  }
`;

export const AudienceImageContainer = styled.div`
  display: none;

  @media (min-width: ${breakpoints.desktop}) {
    display: block;
    border-radius: 32px;
    width: 100%;
    max-width: 520px;
    height: 486px;

    background-image: url(${AboutSecondImg});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
`;

export const AudienceItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 16px;

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 18px;
  }
`;

export const AudienceIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 14px;
  color: var(--primary-wine);

  border: 1px solid var(--primary-wine);
  border-radius: 50%;
`;

export const AudienceSubItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 15px;

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 17px;
  }
`;

export const AudienceIconSmall = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: var(--primary-wine);
`;

// section principles

export const PrinciplesTitle = styled.h2`
  text-align: center;
  margin-bottom: 16px;
  font-size: 28px;

  @media (min-width: ${breakpoints.tablet}) {
    margin-bottom: 20px;
    font-size: 32px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    margin-bottom: 24px;
    font-size: 40px;
  }
`;

export const PrinciplesSubtitle = styled.p`
  text-align: center;
  margin-bottom: 32px;
  font-size: 16px;
  line-height: 1.6;
  color: #666;

  @media (min-width: ${breakpoints.tablet}) {
    margin-bottom: 36px;
    font-size: 18px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    margin-bottom: 40px;
    font-size: 20px;
  }
`;

export const PrinciplesWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (min-width: ${breakpoints.tablet}) {
    gap: 40px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    gap: 48px;
  }
`;

export const PrincipleItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;

    justify-content: space-around;
    gap: 0;
    &:nth-child(even) {
      flex-direction: row-reverse;
    }
  }

  @media (min-width: ${breakpoints.desktop}) {
  }
`;

export const PrincipleImageWrapper = styled.div`
  width: 200px;
  height: auto;
  flex-shrink: 0;

  img {
    width: 100%;
    height: auto;
    display: block;
  }

  @media (min-width: ${breakpoints.tablet}) {
    width: 300px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    width: 500px;
  }
`;

export const PrincipleContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;

  @media (min-width: ${breakpoints.tablet}) {
    gap: 16px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    gap: 20px;
  }
`;

export const PrincipleName = styled.h3`
  font-size: 22px;
  color: var(--primary-wine);

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 26px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    font-size: 30px;
  }
`;

export const PrincipleText = styled.p`
  max-width: 450px;
  text-align: center;
  font-size: 16px;
  line-height: 1.6;
  color: #444;

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 18px;
  }
`;

// section future

export const FutureTitle = styled.h2`
  text-align: center;
  margin-bottom: 16px;
  font-size: 28px;

  @media (min-width: ${breakpoints.tablet}) {
    margin-bottom: 20px;
    font-size: 32px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    margin-bottom: 24px;
    font-size: 40px;
  }
`;

export const FutureSubtitle = styled.p`
  text-align: center;
  margin-bottom: 32px;
  font-size: 16px;
  line-height: 1.6;

  @media (min-width: ${breakpoints.tablet}) {
    margin-bottom: 36px;
    font-size: 18px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    margin-bottom: 40px;
    font-size: 20px;
  }
`;

export const FutureList = styled.ol`
  counter-reset: future-counter;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 24px;
    justify-content: center;
  }

  @media (min-width: ${breakpoints.desktop}) {
    gap: 32px;
  }
`;

export const FutureItem = styled.li`
  counter-increment: future-counter;

  position: relative;
  padding: 16px 16px 16px 56px;

  background-color: var(--white, #fff);
  border-radius: 12px;
  box-shadow: var(--main-shadow, 0px 4px 10px rgba(0, 0, 0, 0.1));

  @media (min-width: ${breakpoints.tablet}) {
    padding: 18px 18px 18px 64px;
    flex-basis: calc((100% - 24px) / 2);
  }

  @media (min-width: ${breakpoints.desktop}) {
    padding: 20px 20px 20px 72px;
    flex-basis: calc((100% - 64px) / 3);
  }

  &::after {
    content: counter(future-counter);

    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);

    width: 28px;
    height: 28px;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: var(--footer-cream);
    color: var(--primary-wine);
    font-weight: 600;

    border-radius: 50%;

    @media (min-width: ${breakpoints.tablet}) {
      width: 36px;
      height: 36px;
    }

    @media (min-width: ${breakpoints.desktop}) {
      width: 40px;
      height: 40px;
    }
  }
`;

export const FutureNumber = styled.span``;

export const FutureText = styled.p`
  font-size: 15px;
  line-height: 1.4;

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 16px;
  }
`;
