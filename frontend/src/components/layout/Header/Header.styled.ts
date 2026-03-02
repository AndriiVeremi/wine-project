import styled from "styled-components";

export const StyledHeader = styled("header")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 70px 0;
  background-color: var(--bg-header);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
`;

export const Nav = styled("nav")`
  ul {
    display: flex;
    gap: 34px;
    list-style: none;
    margin: 0 166px;
  }`;

export const ListItem = styled("li")`
color: var(--font-grey);
font-size: 19px;
font-style: medium;
font-weight: 500;
font-family: var(--font-main);
text-decoration: none;
line-height: 26px;
horizontal-align: center;
`

export const HeaderContainer = styled("div")`
display: flex;
justify-content: space-between;
align-items: center;

`