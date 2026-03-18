import Container from '@/components/Common/Container';

import {
  AboutContainer,
  AboutInfoContainer,
  FeatureCard,
  FeatureIcon,
  FeaturesList,
  FeatureText,
  FirstImgContainer,
  MissionHeading3,
  MissionText,
  Section,
  SectionWithBg,
  SectionWithImage,
  TitleStyled,
  FindSection,
  FindTitle,
  FindList,
  FindItem,
  FindIcon,
  FindText,
  FindHeadingSecond,
  AudienceSection,
  AudienceContent,
  AudienceTitle,
  AudienceText,
  AudienceList,
  AudienceItem,
  AudienceSubList,
  AudienceSubItem,
  AudienceImageContainer,
  AudienceIconSmall,
  AudienceIcon,
} from './AboutPage.styled';

import { FiInfo, FiHeadphones, FiLayers, FiMapPin, FiStar, FiCheck } from 'react-icons/fi';
import { GiGrapes, GiWineBottle, GiWineGlass } from 'react-icons/gi';

const AboutPage = () => {
  return (
    <>
      <Container>
        <Section>
          <AboutContainer>
            <FirstImgContainer></FirstImgContainer>
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
          <FindSection>
            <FindTitle>What You Can Find on Wine Discovery</FindTitle>
            <FindHeadingSecond>On Wine Discovery, users can:</FindHeadingSecond>
            <FindList>
              <FindItem>
                <FindIcon>
                  <FiMapPin />
                </FindIcon>
                <FindText>Explore wine regions using an interactive map.</FindText>
              </FindItem>

              <FindItem>
                <FindIcon>
                  <GiWineBottle />
                </FindIcon>
                <FindText>
                  Browse winery profiles with descriptions, contact details, and wine listings.
                </FindText>
              </FindItem>

              <FindItem>
                <FindIcon>
                  <GiWineGlass />
                </FindIcon>
                <FindText>
                  Discover wines by region, grape variety, wine type, color, vintage, or rating.
                </FindText>
              </FindItem>

              <FindItem>
                <FindIcon>
                  <GiGrapes />
                </FindIcon>
                <FindText>Learn about grape varieties, their characteristics, and usage.</FindText>
              </FindItem>

              <FindItem>
                <FindIcon>
                  <FiStar />
                </FindIcon>
                <FindText>
                  Save favorite wines, leave ratings, and write reviews (for registered users).
                </FindText>
              </FindItem>
            </FindList>
          </FindSection>
        </Container>
      </SectionWithImage>
      <Section>
        <Container>
          <AudienceSection>
            <AudienceContent>
              <AudienceTitle>Who Is Wine Discovery For</AudienceTitle>

              <AudienceText>
                Wine Discovery is designed for a wide range of users, including:
              </AudienceText>

              <AudienceList>
                <AudienceItem>
                  <AudienceIcon>
                    <FiCheck />
                  </AudienceIcon>
                  <span>wine enthusiasts and curious explorers;</span>
                </AudienceItem>

                <AudienceItem>
                  <AudienceIcon>
                    <FiCheck />
                  </AudienceIcon>
                  <span>travelers interested in wine regions and wine tourism;</span>
                </AudienceItem>

                <AudienceItem>
                  <AudienceIcon>
                    <FiCheck />
                  </AudienceIcon>
                  <span>sommeliers, restaurateurs, and wine industry professionals;</span>
                </AudienceItem>

                <AudienceItem>
                  <AudienceIcon>
                    <FiCheck />
                  </AudienceIcon>
                  <span>wineries, especially:</span>
                </AudienceItem>

                <AudienceSubList>
                  <AudienceSubItem>
                    <AudienceIconSmall>
                      <FiCheck />
                    </AudienceIconSmall>
                    <span>those without their own websites,</span>
                  </AudienceSubItem>

                  <AudienceSubItem>
                    <AudienceIconSmall>
                      <FiCheck />
                    </AudienceIconSmall>
                    <span>those seeking additional online visibility,</span>
                  </AudienceSubItem>

                  <AudienceSubItem>
                    <AudienceIconSmall>
                      <FiCheck />
                    </AudienceIconSmall>
                    <span>those looking to attract new audiences,</span>
                  </AudienceSubItem>

                  <AudienceSubItem>
                    <AudienceIconSmall>
                      <FiCheck />
                    </AudienceIconSmall>
                    <span>
                      those aiming to present their wines and winery in a clear, structured format;
                    </span>
                  </AudienceSubItem>
                </AudienceSubList>
                <AudienceItem>
                  <AudienceIcon>
                    <FiCheck />
                  </AudienceIcon>
                  <span>anyone interested in wine, its origin, and cultural background.</span>
                </AudienceItem>
              </AudienceList>

              <AudienceText>
                For wineries, Wine Discovery can serve as a <strong>digital showcase</strong>,
                informational profile, and an additional channel to reach wine-interested audiences.
              </AudienceText>
            </AudienceContent>

            <AudienceImageContainer>{/* твоє зображення-колаж */}</AudienceImageContainer>
          </AudienceSection>
        </Container>
      </Section>
      <SectionWithBg></SectionWithBg>
    </>
  );
};

export default AboutPage;
