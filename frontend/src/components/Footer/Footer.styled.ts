import styled from 'styled-components';
import { FaFacebookF, FaTelegramPlane } from 'react-icons/fa';
import { BiLogoInstagramAlt } from 'react-icons/bi';
import '@/styles/vars.css';

export const StyledFooter = styled('footer')`
  height: 100%;
  background-color: var(--footer-cream);
`;
export const FooterContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 50px;
`;

export const LogoWrapper = styled('div')`
  padding: 22px 0 22px 0;
`;

export const InfoList = styled('ul')`
  display: flex;
  gap: 30px;
`;

export const SocialList = styled('ul')`
  display: flex;
  gap: 16px;
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
  height: 28px;
`;

export const InstagramIcon = styled(BiLogoInstagramAlt)`
  color: var(--primary-wine);
  width: 32px;
  height: 32px;
`;
export const TelegramIcon = styled(FaTelegramPlane)`
  color: var(--primary-wine);
  width: 30px;
  height: 30px;
`;

export const IconCircle = styled('div')`
  width: 52px;
  height: 52px;
  border: 1px solid var(--primary-wine);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 1s ease;

  &:hover {
    background-color: var(--primary-wine);
    ${FacebookIcon}, ${InstagramIcon}, ${TelegramIcon} {
      color: var(--footer-cream);
      transition: all 0.5s ease;
    }
  }
`;

export const Copyright = styled('p')`
  font-family: var(--font-main);
  font-size: 16px;
  font-weight: 400;
  font-style: regular;
  color: var(--font-grey);
  line-height: 20px;
  text-align: center;
  padding-bottom: 32px;
`;
