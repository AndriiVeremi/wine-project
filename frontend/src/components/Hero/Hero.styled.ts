import styled from 'styled-components';

export const HeroSection = styled('section')`
  width: 100%;
  overflow: hidden;
`;

export const HeroWrapper = styled('div')`
  max-width: 800px;
  padding-left: 100px;
  padding-top: 60px;
  margin-bottom: 80px;

  @media (max-width: 1279px) {
    padding: 32px;
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(10px);
    border-radius: 32px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 20px;
  }

  @media (max-width: 767px) {
    padding: 24px 16px;
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 100%;
    margin-left: 0;
    margin-right: 0;
  }
`;

export const HeroTitle = styled('h1')`
  font-family: var(--font-main);
  font-size: 44px;
  font-weight: 600;
  color: var(--font-dark);
  margin-bottom: 30px;

  @media (max-width: 1024px) {
    font-size: 36px;
  }

  @media (max-width: 767px) {
    font-size: 28px;
    text-align: center;
    text-shadow:
      0px 0px 8px rgba(255, 255, 255, 0.9),
      0px 0px 4px rgba(255, 255, 255, 0.5);
  }
`;

export const HeroSubtitleWrapper = styled('div')`
  max-width: 540px;
  margin-bottom: 30px;

  @media (max-width: 767px) {
    max-width: 100%;
  }
`;

export const HeroSubtitle = styled('h2')`
  font-family: var(--font-main);
  font-weight: 400;
  font-size: 24px;
  line-height: 1.2;
  color: var(--primary-gray);

  @media (max-width: 767px) {
    font-size: 18px;
    text-align: center;
    text-shadow:
      0px 0px 8px rgba(255, 255, 255, 0.9),
      0px 0px 4px rgba(255, 255, 255, 0.5);
  }
`;

export const Span = styled('span')`
  color: var(--primary-wine);
`;

export const TextWrapper = styled('div')`
  max-width: 600px;
  margin-top: 20px;

  @media (max-width: 767px) {
    max-width: 100%;
  }
`;

export const Text = styled('p')`
  font-family: var(--font-main);
  font-weight: 400;
  font-size: 20px;
  line-height: 1.7;

  @media (max-width: 767px) {
    font-size: 16px;
    text-align: center;
    line-height: 1.5;
    text-shadow:
      0px 0px 8px rgba(255, 255, 255, 0.9),
      0px 0px 4px rgba(255, 255, 255, 0.5);
  }
`;
