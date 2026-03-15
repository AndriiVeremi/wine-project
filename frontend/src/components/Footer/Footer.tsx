import MainLogo from '@/components/MainLogo/MainLogo';
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
} from '@/components/Footer/Footer.styled';
import Container from '@/components/common/Container';
import { Link } from 'react-router-dom';

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
                  <Link to="/about">About project</Link>
                </Item>
                <Item>
                  <Link to="/contacts">Contacts</Link>
                </Item>
                <Item>
                  <Link to="/privacy">Privacy policy</Link>
                </Item>
                <Item>
                  <Link to="/terms">Terms of use</Link>
                </Item>
                <Item>
                  <Link to="/cookies">Cookies</Link>
                </Item>
              </InfoList>
            </StyledNav>
            <SocialList>
              <li>
                <IconCircle>
                  <FacebookIcon />
                </IconCircle>
              </li>
              <li>
                <IconCircle>
                  <InstagramIcon />
                </IconCircle>
              </li>
              <li>
                <IconCircle>
                  <TelegramIcon />
                </IconCircle>
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
