import MainLogo from '@/components/MainLogo/MainLogo';
import {
  InfoList,
  SocialList,
  StyledFooter,
  FooterContainer,
  Text,
  FacebookIcon,
  IconCircle,
  InstagramIcon,
  TelegramIcon,
  LogoWrapper,
  Copyright,
} from '@/components/Footer/Footer.styled';
import Container from '@/components/common/Container';

const Footer = () => {
  return (
    <>
      <StyledFooter>
        <Container>
          <FooterContainer>
            <LogoWrapper>
              <a href="/" target="_blank" rel="noopener noreferrer">
              <MainLogo />
              </a>
            </LogoWrapper>
            <nav>
              <InfoList>
                <li>
                  <Text>About project</Text>
                </li>
                <li>
                  <Text>Contacts</Text>
                </li>
                <li>
                  <Text>Privacy policy</Text>
                </li>
                <li>
                  <Text>Terms of use</Text>
                </li>
                <li>
                  <Text>Cookies</Text>
                </li>
              </InfoList>
            </nav>
            <SocialList>
              <li>
                <a href="https://www.facebook.com/goitclub/" target="_blank" rel="noopener noreferrer">
                  <IconCircle>
                    <FacebookIcon />
                  </IconCircle>
                </a>
              </li>
              <li>
               <a href="https://www.instagram.com/goitclub/" target="_blank" rel="noopener noreferrer">
                  <IconCircle>
                    <InstagramIcon />
                  </IconCircle>
                </a>
              </li>
              <li>
                <a href="https://t.me/junior_developer_ua" target="_blank" rel="noopener noreferrer">
                  <IconCircle>
                    <TelegramIcon />
                  </IconCircle>
                </a>
              </li>
            </SocialList>
          </FooterContainer>
          <Copyright>Copyright © Wine Discovery, 2026</Copyright>
        </Container>
      </StyledFooter>
    </>
  );
};

export default Footer;
