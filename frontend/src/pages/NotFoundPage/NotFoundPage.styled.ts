import styled from 'styled-components';

export const NotFoundWrapper = styled.div`
  width: 100%;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
  text-align: center;

  @media (max-width: 767px) {
    padding: 40px 0;
    min-height: 50vh;
  }
`;

export const NotFoundImage = styled.img`
  max-width: 600px;
  width: 100%;
  height: auto;
  margin-bottom: 40px;

  @media (max-width: 767px) {
    max-width: 300px;
  }
`;

export const NotFoundButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
