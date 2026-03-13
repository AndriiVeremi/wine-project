import styled from 'styled-components';

export const StyledWinePageDiv = styled.div`
  width: 100%;
  display: flex;
  gap: 80px;
  padding-bottom: 500px;
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
  margin-top: 40px;
  font-family: var(--font-main);
  font-size: 18px;
  line-height: 1.8;
  color: var(--primary-gray);
  max-width: 100%;

  p {
    margin-bottom: 8px;
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
