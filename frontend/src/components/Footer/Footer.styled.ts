import styled from 'styled-components';
import { FaFacebookF, FaTelegramPlane } from 'react-icons/fa';
import { BiLogoInstagramAlt } from 'react-icons/bi';
import '@/styles/vars.css';

export const StyledFooter = styled('footer')`
  height: 100%;
  margin: 0 auto;
  background-color: var(--footer-cream);
`;
export const FooterContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px 0 0 0;
`;

export const StyledNav = styled('nav')`
  ul li {
    cursor: pointer;

    &:hover {
      color: var(--primary-wine);
      transition: all 0.5s ease;
    }
  }
`;

export const InfoList = styled('ul')`
  display: flex;
  gap: 30px;
`;

export const SocialList = styled('ul')`
  display: flex;
  gap: 16px;
`;

export const Item = styled('li')`
  color: var(--font-grey);
  font-size: 19px;
  font-style: medium;
  font-weight: 500;
  font-family: var(--font-main);
  text-decoration: none;
  line-height: 26px;
  horizontal-align: center;

  &:hover {
    color: var(--primary-wine);
    transition: all 0.5s ease;
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
  width: 16px;
  height: 18px;
`;

export const InstagramIcon = styled(BiLogoInstagramAlt)`
  color: var(--primary-wine);
  width: 32px;
  height: 22px;
`;
export const TelegramIcon = styled(FaTelegramPlane)`
  color: var(--primary-wine);
  width: 30px;
  height: 20px;
`;

export const IconCircle = styled('div')`
  width: 32px;
  height: 32px;
  border: 1px solid var(--primary-wine);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 1s ease;
  cursor: pointer;

  &:hover {
    background-color: var(--primary-wine);
    ${FacebookIcon}, ${InstagramIcon}, ${TelegramIcon} {
      color: var(--footer-cream);
      transition: all 0.5s ease;
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
  padding-bottom: 30px;
`;
