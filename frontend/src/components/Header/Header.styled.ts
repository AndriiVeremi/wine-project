import styled from 'styled-components';

export const StyledHeader = styled('header')`
  position: absolute;
  // top: 0;
  // left: 50%;
  // transform: translateX(-50%);
  // width: 100%;
  // z-index: 100;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0;
  background-color: transparent;

`;

export const Nav = styled('nav')`
  ul {
    display: flex;
    gap: 34px;
    list-style: none;
    margin: 0 26px;
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
  horizontal-align: center;
`;

export const HeaderContainer = styled('div')`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
