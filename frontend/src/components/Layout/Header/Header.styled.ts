import styled from 'styled-components';
import { breakpoints } from '@/styles/breakpoints';

export const StyledHeader = styled('header')`
  position: relative;
  width: 100%;
  padding: 45px 0;
  background-color: transparent;
  z-index: 10;
  @media (max-width: 1279px) {
    padding: 35px 0;
  }
  @media (max-width: 767px) {
    padding: 35px 0;
  }
  @media (max-width: 480px) {
    padding: 30px 0;
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
  transition: var(--transition);
  @media (min-width: 1280px) {
    font-size: 18px;
  }
  &:hover {
    color: var(--primary-wine);
  }
  a {
    color: inherit;
    text-decoration: none;
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
  font-size: 32px;
  color: var(--primary-wine);
  padding: 5px;
  background: none;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
  @media (min-width: 1100px) {
    display: none;
  }
  @media (max-width: 767px) {
    font-size: 28px;
  }
`;

export const DesktopUserMenu = styled.div`
  display: none;
  flex-shrink: 0;
  @media (min-width: 1100px) {
    display: block;
  }
`;
