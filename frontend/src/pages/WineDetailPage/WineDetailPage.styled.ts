import styled from 'styled-components';

export const StyledWinePageDiv = styled.div`
  width: 100%;
  display: flex;
  gap: 80px;
  padding-bottom: 100px;
`;

export const SliderSection = styled.section`
  margin-top: 80px;
  margin-bottom: 100px;
  width: 100%;
`;

export const SliderTitle = styled.h2`
  text-align: center;
  font-size: 38px;
  margin-bottom: 40px;
  color: var(--primary-wine);
  font-family: var(--font-main);
`;

export const StyledWraperImage = styled.div`
  flex: 0 0 896px;
  display: flex;
  flex-direction: column;
`;

export const StyledWineInfo = styled.div`
  flex: 1;
`;

export const StyledWineImg = styled.img`
  width: 100%;
  height: 635px;
  object-fit: cover;
`;

export const WineDetailPageTabs = styled.div`
  margin-top: 72px;
  display: flex;
  gap: 24px;
`;

export const WineDescriptionContent = styled.div`
  margin-top: 80px;
  font-family: var(--font-main);
  font-size: 18px;
  line-height: 1.8;
  color: var(--primary-gray);
  max-width: 100%;

  p {
    margin-bottom: 20px;
  }

  .description-title {
    margin-top: 32px;
  }

  .description-label {
    font-weight: 700;
    color: var(--black);
    margin-right: 8px;
  }
`;
