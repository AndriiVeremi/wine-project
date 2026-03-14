import styled from 'styled-components';
import { FaFacebookF, FaTelegramPlane } from 'react-icons/fa';
import { BiLogoInstagramAlt } from 'react-icons/bi';

export const MobileMenuOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 250px;
  height: 100vh;
  height: 100dvh;
  background-color: var(--white);
  z-index: 101;
  transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  padding: 50px 0 20px;
  overflow: hidden;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  border-left: 1px solid var(--tertiary-gray);
`;

export const Backdrop = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition:
    opacity var(--transition),
    visibility var(--transition);
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  color: var(--primary-wine);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  transition: var(--transition);

  &:hover {
    background-color: var(--primary-wine-light, #f8eeee);
  }
`;

export const MenuNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 15px;
  flex: 1;
`;

export const MenuLink = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  width: 100%;
  border: none;
  background: ${({ $active }) => ($active ? 'var(--primary-wine-light, #f8eeee)' : 'none')};
  color: ${({ $active }) => ($active ? 'var(--primary-wine)' : 'var(--primary-gray)')};
  font-family: var(--font-main);
  font-size: 15px;
  font-weight: ${({ $active }) => ($active ? '500' : '400')};
  cursor: pointer;
  transition: var(--transition);
  border-left: 4px solid ${({ $active }) => ($active ? 'var(--primary-wine)' : 'transparent')};
  text-align: left;

  &:hover {
    background-color: var(--tertiary-gray);
    color: var(--primary-wine);
  }

  svg {
    font-size: 18px;
  }
`;

export const SectionTitle = styled.h3`
  font-size: 11px;
  text-transform: uppercase;
  color: var(--secondary-gray);
  margin: 10px 16px 4px;
  font-weight: 600;
`;

export const SocialList = styled.ul`
  display: flex;
  gap: 16px;
  margin: 15px 16px 0;
  padding-top: 15px;
  border-top: 1px solid var(--tertiary-gray);
`;

export const SocialIconWrapper = styled.div`
  width: 36px;
  height: 36px;
  border: 1px solid var(--primary-wine);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: var(--transition);
  color: var(--primary-wine);

  &:hover {
    background-color: var(--primary-wine);
    color: var(--white);
  }
`;

export const FacebookIcon = styled(FaFacebookF)`
  font-size: 18px;
`;

export const InstagramIcon = styled(BiLogoInstagramAlt)`
  font-size: 22px;
`;

export const TelegramIcon = styled(FaTelegramPlane)`
  font-size: 20px;
`;

export const UserMenuMobile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0 16px;
  padding-top: 15px;
  border-top: 1px solid var(--tertiary-gray);
`;
