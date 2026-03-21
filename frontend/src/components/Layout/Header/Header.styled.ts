import styled from 'styled-components';
import { breakpoints } from '@/styles/breakpoints';

export const StyledHeader = styled('header')`
  position: relative;
  width: 100%;
  padding: 45px 0;
  min-height: 150px;
  background-color: transparent;
  z-index: 10;
  @media (max-width: 1279px) {
    padding: 35px 0;
    min-height: 115px;
  }
  @media (max-width: 767px) {
    padding: 35px 0;
    min-height: 115px;
  }
  @media (max-width: 480px) {
    padding: 30px 0;
    min-height: 105px;
  }
`;

export const HeaderWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  @media (max-width: 1279px) {
    max-width: 95%;
    padding: 0 40px;
  }
  @media (max-width: 480px) {
    padding: 0 35px;
  }
  @media (min-width: ${breakpoints.desktop}) {
    max-width: 1200px;
    padding: 0 30px;
  }
  @media (min-width: ${breakpoints.largeDesktop}) {
    max-width: 1400px;
    padding: 0 40px;
  }
`;

export const Nav = styled('nav')`
  display: none;
  @media (min-width: 1100px) {
    display: flex;
    justify-content: center;
    align-items: center;
    ul {
      display: flex;
      justify-content: center;
      gap: 15px;
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }
  @media (min-width: 1280px) {
    ul {
      gap: 30px;
    }
  }
`;

export const Item = styled('li')`
  color: var(--font-grey);
  font-size: 16px;
  font-weight: 500;
  font-family: var(--font-main);
  text-decoration: none;
  line-height: 26px;
  white-space: nowrap;
  transition: color 0.2s ease;
  @media (min-width: 1280px) {
    font-size: 18px;
  }
  &:hover {
    color: var(--primary-wine);
  }
  a {
    position: relative;
    color: inherit;
    text-decoration: none;

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
`;

export const HeaderContainer = styled('div')`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  & > *:first-child,
  & > *:last-child {
    flex-shrink: 0;
  }
  @media (max-width: 1100px) {
    gap: 10px;
  }
`;

export const BurgerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: var(--primary-wine);
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(132, 16, 19, 0.1);
  border-radius: 12px;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  &:active {
    transform: scale(0.95);
    background: var(--white);
  }

  @media (min-width: 1100px) {
    display: none;
  }

  @media (max-width: 767px) {
    font-size: 24px;
    width: 40px;
    height: 40px;
  }
`;

export const DesktopUserMenu = styled.div`
  display: none;
  flex-shrink: 0;
  @media (min-width: 1100px) {
    display: block;
  }
`;
