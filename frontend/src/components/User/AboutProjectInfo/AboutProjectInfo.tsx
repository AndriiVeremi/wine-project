import styled from 'styled-components';
import { FiInfo, FiLayers, FiCheckCircle } from 'react-icons/fi';
import { GiGrapes } from 'react-icons/gi';

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const HeaderSection = styled.div`
  background: #fdf6f6;
  padding: 24px;
  border-radius: 12px;
  border-left: 4px solid #841013;
`;

const HighlightText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  margin-bottom: 0;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

const IconWrapper = styled.div`
  color: #841013;
  font-size: 24px;
`;

const FeatureContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FeatureTitle = styled.h4`
  margin: 0;
  font-size: 16px;
  color: #333;
`;

const FeatureText = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
`;

const AboutProjectInfo = () => {
  return (
    <InfoWrapper>
      <HeaderSection>
        <HighlightText>
          <strong>Wine Discovery</strong> is a digital platform dedicated to exploring the world of
          Georgian wine and winemaking. We aim to bring together information about traditions,
          regions, and modern producers in a single digital space.
        </HighlightText>
      </HeaderSection>

      <FeatureGrid>
        <FeatureItem>
          <IconWrapper>
            <FiInfo />
          </IconWrapper>
          <FeatureContent>
            <FeatureTitle>Education</FeatureTitle>
            <FeatureText>Learn about unique grape varieties and winemaking methods.</FeatureText>
          </FeatureContent>
        </FeatureItem>

        <FeatureItem>
          <IconWrapper>
            <GiGrapes />
          </IconWrapper>
          <FeatureContent>
            <FeatureTitle>Discovery</FeatureTitle>
            <FeatureText>Discover historic wineries and small family-run cellars.</FeatureText>
          </FeatureContent>
        </FeatureItem>

        <FeatureItem>
          <IconWrapper>
            <FiLayers />
          </IconWrapper>
          <FeatureContent>
            <FeatureTitle>Structure</FeatureTitle>
            <FeatureText>Easily navigate through regions using interactive maps.</FeatureText>
          </FeatureContent>
        </FeatureItem>

        <FeatureItem>
          <IconWrapper>
            <FiCheckCircle />
          </IconWrapper>
          <FeatureContent>
            <FeatureTitle>Quality</FeatureTitle>
            <FeatureText>Information based on reliable and verifiable sources.</FeatureText>
          </FeatureContent>
        </FeatureItem>
      </FeatureGrid>

      <div style={{ marginTop: '20px' }}>
        <p style={{ color: '#666', fontSize: '14px', fontStyle: 'italic' }}>
          * Wine Discovery is a project in continuous development, aimed at expanding Georgian wine
          culture globally.
        </p>
      </div>
    </InfoWrapper>
  );
};

export default AboutProjectInfo;
