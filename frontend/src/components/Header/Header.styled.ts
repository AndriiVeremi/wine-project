import styled from 'styled-components';

export const StyledHeader = styled('header')`
  position: relative;
  width: 100%;
  padding: 30px 0;
  background-color: transparent;
  z-index: 10;

  @media (max-width: 1279px) {
    padding: 20px 0;
  }

  @media (max-width: 767px) {
    padding: 15px 0;
  }

  @media (max-width: 480px) {
    padding: 10px 15px; /* Fluid padding on small mobiles */
  }
`;

export const Nav = styled('nav')`
  display: none;

  @media (min-width: 768px) {
    display: block;
    ul {
      display: flex;
      gap: 20px;
      list-style: none;
      margin: 0 15px;
    }
  }

  @media (min-width: 1280px) {
    ul {
      gap: 34px;
      margin: 0 26px;
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
  text-align: center;
  transition: var(--transition);

  @media (min-width: 1280px) {
    font-size: 19px;
  }

  &:hover {
    color: var(--primary-wine);
  }
`;

export const HeaderContainer = styled('div')`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  @media (max-width: 480px) {
    gap: 5px;
  }
`;

export const BurgerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: var(--primary-wine);
  padding: 5px;
  background: none;
  border: none;
  cursor: pointer;

  @media (max-width: 480px) {
    font-size: 24px;
    padding: 2px;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

export const DesktopUserMenu = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;
