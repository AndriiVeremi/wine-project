import styled from "styled-components";
import "@/styles/vars.css";

export const StyledFooter = styled("footer")`
height: 100%;
background-color: var(--footer-cream);
`
export const FooterContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0;
`

export const InfoList = styled("ul")`
  display: flex;
  gap: 30px;
`;

export const SocialList = styled("ul")`
  display: flex;
  gap: 30px;
`;  