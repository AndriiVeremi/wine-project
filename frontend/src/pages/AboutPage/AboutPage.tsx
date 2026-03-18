import AboutFirstImg from '@/assets/about-first.png';
import AboutSecondImg from '@/assets/about-second.png';
import Container from '@/components/Common/Container';
import {
  AboutContainer,
  AboutInfoContainer,
  FeatureCard,
  FeatureIcon,
  FeaturesList,
  FeatureText,
  FirstImg,
  FirstImgContainer,
  MissionHeading3,
  MissionText,
  Section,
  SectionWithBg,
  SectionWithImage,
  TitleStyled,
} from './AboutPage.styled';
import { FiInfo, FiHeadphones, FiLayers } from 'react-icons/fi';
import { GiGrapes } from 'react-icons/gi';

const AboutPage = () => {
  return (
    <>
      <Container>
        <Section>
          <AboutContainer>
            <FirstImgContainer>
              <FirstImg src={AboutFirstImg} alt="About Wine Discovery" />
            </FirstImgContainer>
            <AboutInfoContainer>
              <h2>About the Project</h2>
              <p>
                <strong>Wine Discovery</strong> is a digital platform dedicated to exploring the
                world of wine and winemaking.
              </p>
              <p>
                The project provides a structured and accessible catalog of wines, wineries, wine
                regions, and grape varieties, helping users navigate the diversity of wine culture
                and discover new producers, regions, and styles.
              </p>
              <p>
                <strong>
                  Wine Discovery is a project that covers wine-producing countries and regions,
                  bringing together information about wine, winemaking traditions, and wine culture
                  in a single digital space.
                </strong>
              </p>
              <p>
                The platform is designed with a unified structure that allows it to grow organically
                while maintaining consistent navigation and data presentation.
              </p>
            </AboutInfoContainer>
          </AboutContainer>
        </Section>
        <Section>
          <TitleStyled>Our Mission</TitleStyled>
          <MissionText>
            Our mission is to make wine culture more accessible, understandable, and structured
            through modern digital solutions.
          </MissionText>
          <MissionHeading3>We aim to:</MissionHeading3>
          <FeaturesList>
            <FeatureCard>
              <FeatureIcon>
                <FiInfo />
              </FeatureIcon>
              <FeatureText>
                Organize information about wine and winemaking in one place;
              </FeatureText>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>
                <FiHeadphones />
              </FeatureIcon>
              <FeatureText>
                Help users discover wines by region, grape variety, type, and other characteristics;
              </FeatureText>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>
                <GiGrapes />
              </FeatureIcon>
              <FeatureText>
                Highlight the uniqueness of wine regions and local winemaking traditions;
              </FeatureText>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>
                <FiLayers />
              </FeatureIcon>
              <FeatureText>
                Create a platform that combines exploration, education, and intuitive search.
              </FeatureText>
            </FeatureCard>
          </FeaturesList>
        </Section>
      </Container>

      <SectionWithImage>
        <Container>
          <h2>What You Can Find on Wine Discovery</h2>
        </Container>
      </SectionWithImage>
    </>
  );
};

export default AboutPage;
