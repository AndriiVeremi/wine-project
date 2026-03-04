import MainLogo from '@/components/MainLogo/MainLogo';
import { InfoList, SocialList, StyledFooter, FooterContainer } from "@/components/Footer/Footer.styled";
import Container from '@/components/Container';

const Footer = () => {
  return <>
  <StyledFooter>
    <Container>
      <FooterContainer>
          <MainLogo />
          <InfoList>
          <li><p>About project</p></li>
          <li><p>Contacts</p></li>
          <li><p>Privacy policy</p></li>
          <li><p>Terms of use</p></li>
          <li><p>Cookies</p></li>
        </InfoList>
        <SocialList>
          <li>facebook</li>
          <li>instagram</li>
          <li>telegram</li>
        </SocialList>
      </FooterContainer>
    </Container>
  </StyledFooter>
  </>
};

export default Footer;
