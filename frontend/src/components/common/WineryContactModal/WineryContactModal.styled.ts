import styled from 'styled-components';
import { breakpoints } from '@/styles/breakpoints';

export const ContactModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--overlay);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
  padding: 20px;
`;

export const ContactModalContainer = styled.div`
  background: var(--white);
  width: 100%;
  max-width: 450px;
  border-radius: 24px;
  padding: 32px;
  position: relative;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (min-width: ${breakpoints.tablet}) {
    padding: 40px;
  }
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--secondary-gray);
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);

  &:hover {
    color: var(--primary-wine);
    transform: rotate(90deg);
  }
`;

export const WineryLogo = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto;
  border: 3px solid var(--bg-main);
`;

export const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: var(--black-color);
  text-align: center;
  margin: 0;
`;

export const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 8px 0;
`;

export const ContactLink = styled.a`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: var(--bg-main);
  border-radius: 16px;
  color: var(--black-color);
  text-decoration: none;
  font-weight: 600;
  transition: var(--transition);

  .icon-wrapper {
    width: 40px;
    height: 40px;
    background: var(--white);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary-wine);
    font-size: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  &:hover {
    background: var(--tertiary-gray);
    transform: translateX(5px);
  }
`;

export const InfoFooter = styled.p`
  font-size: 14px;
  color: var(--secondary-gray);
  text-align: center;
  line-height: 1.5;
  margin: 0;
`;
