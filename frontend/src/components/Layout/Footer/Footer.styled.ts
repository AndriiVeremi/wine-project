import styled from 'styled-components';
import { FaFacebookF, FaTripadvisor } from 'react-icons/fa';
import { BiLogoInstagramAlt } from 'react-icons/bi';

export const StyledFooter = styled('footer')`
  width: 100%;
  min-height: fit-content;
  margin: 0 auto;
  background-color: var(--footer-cream);
`;
export const FooterContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px 0 0 0;

  @media (max-width: 767px) {
    flex-wrap: wrap;
    padding: 30px 0 15px 0;
  }
`;

export const LogoWrapper = styled('div')`
  @media (max-width: 767px) {
    order: 2;
  }
`;

export const StyledNav = styled('nav')`
  ul li {
    cursor: pointer;
  }

  @media (max-width: 767px) {
    width: 100%;
    order: 1;
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
  }
`;

export const InfoList = styled('ul')`
  display: flex;
  gap: 30px;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
`;

export const SocialList = styled('ul')`
  display: flex;
  gap: 16px;

  @media (max-width: 767px) {
    order: 3;
  }
`;

export const Item = styled('li')`
  color: var(--font-grey);
  font-size: 19px;
  font-style: medium;
  font-weight: 500;
  font-family: var(--font-main);
  text-decoration: none;
  line-height: 26px;
  transition: color 0.2s ease;

  @media (max-width: 767px) {
    font-size: 16px;
    line-height: 1.5;
    text-align: left;
  }

  a {
    position: relative;
    color: inherit;
    text-decoration: none;
    transition: color 0.2s ease;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -10px;
      width: 100%;
      height: 2px;
      background-color: var(--primary-wine);
      transition: transform 0.2s ease;
      transform: scaleX(0);
      transform-origin: left;
    }

    &.active {
      color: var(--primary-wine);
      &::after {
        transform: scaleX(1);
      }
    }
  }

  &:hover {
    color: var(--primary-wine);
  }
`;

export const Text = styled('p')`
  font-family: var(--font-main);
  font-size: 19px;
  font-weight: 500;
  color: var(--font-grey);
  line-height: 26px;
`;

export const FacebookIcon = styled(FaFacebookF)`
  color: var(--primary-wine);
  width: 20px;
  height: 24px;
  transition: color 0.3s ease;
`;

export const InstagramIcon = styled(BiLogoInstagramAlt)`
  color: var(--primary-wine);
  width: 36px;
  height: 30px;
  transition: color 0.3s ease;
`;
export const TelegramIcon = styled(FaTripadvisor)`
  color: var(--primary-wine);
  width: 34px;
  height: 28px;
  transition: color 0.3s ease;
`;

export const IconCircle = styled('div')`
  width: 48px;
  height: 48px;
  border: 1px solid var(--primary-wine);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: var(--primary-wine);
    ${FacebookIcon}, ${InstagramIcon}, ${TelegramIcon} {
      color: var(--footer-cream);
    }
  }
`;

export const CopyrightText = styled('p')`
  font-family: var(--font-main);
  font-size: 12px;
  font-weight: 400;
  font-style: regular;
  color: var(--font-grey);
  line-height: 20px;
  text-align: center;
  margin-top: 20px;
  padding-bottom: 5px;

  @media (max-width: 767px) {
    margin-top: 10px;
    padding-bottom: 20px;
  }
`;
