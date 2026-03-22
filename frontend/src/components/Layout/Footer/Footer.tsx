import MainLogo from '@/components/Common/MainLogo';
import {
  InfoList,
  SocialList,
  StyledFooter,
  FooterContainer,
  FacebookIcon,
  IconCircle,
  InstagramIcon,
  TelegramIcon,
  CopyrightText,
  StyledNav,
  Item,
  LogoWrapper,
} from '@/components/Layout/Footer/Footer.styled';
import Container from '@/components/Common/Container';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <StyledFooter>
        <Container>
          <FooterContainer>
            <LogoWrapper>
              <MainLogo />
            </LogoWrapper>
            <StyledNav>
              <InfoList>
                <Item>
                  <NavLink to="/about">About project</NavLink>
                </Item>
                <Item>
                  <NavLink to="/contacts">Contacts</NavLink>
                </Item>
                <Item>
                  <NavLink to="/privacy">Privacy policy</NavLink>
                </Item>
                <Item>
                  <NavLink to="/terms">Terms of use</NavLink>
                </Item>
                <Item>
                  <NavLink to="/cookies">Cookies</NavLink>
                </Item>
              </InfoList>
            </StyledNav>
            <SocialList>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our Facebook page"
                >
                  <IconCircle>
                    <FacebookIcon />
                  </IconCircle>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our Instagram page"
                >
                  <IconCircle>
                    <InstagramIcon />
                  </IconCircle>
                </a>
              </li>
              <li>
                <a
                  href="https://tripadvisor.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our TripAdvisor page"
                >
                  <IconCircle>
                    <TelegramIcon />
                  </IconCircle>
                </a>
              </li>
            </SocialList>
          </FooterContainer>
          <div>
            <CopyrightText>Copyright © Wine Discovery, 2026</CopyrightText>
          </div>
        </Container>
      </StyledFooter>
    </>
  );
};

export default Footer;
