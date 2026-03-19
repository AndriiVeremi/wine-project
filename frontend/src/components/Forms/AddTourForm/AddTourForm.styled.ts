import styled from 'styled-components';

export const AddTourWrapper = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

export const Title = styled.h2`
  font-family: var(--font-accent);
  font-size: 24px;
  color: var(--accent-color, #841013);
  margin-bottom: 25px;
  text-transform: uppercase;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 25px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FullWidthWrapper = styled.div`
  grid-column: 1 / -1;
`;

export const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 20px 0 10px;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
`;

export const TopSection = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 30px;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

export const PhotoSide = styled.div`
  flex: 0 0 300px;
`;

export const InfoSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const ButtonWrapper = styled.div`
  margin-top: 60px;
  padding-top: 32px;
  border-top: 1px solid #f1f5f9;
  display: flex;
  justify-content: flex-end;
  gap: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
    button {
      width: 100%;
    }
  }
`;

export const GroupSizeWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
`;
