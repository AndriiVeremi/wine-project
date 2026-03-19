import styled from 'styled-components';

export const AddWineWrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  background-color: #ffffff;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  border: 1px solid #f1f5f9;
`;

export const Title = styled.h2`
  font-weight: 700;
  font-size: 24px;
  color: #1e293b;
  margin-bottom: 40px;
  text-align: left;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const TopSection = styled.div`
  display: flex;
  gap: 48px;
  margin-bottom: 48px;

  @media (max-width: 950px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const PhotoSide = styled.div`
  width: 340px;
  flex-shrink: 0;

  @media (max-width: 950px) {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }
`;

export const InfoSide = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 32px;
  row-gap: 24px;

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;

export const SectionTitle = styled.h3`
  grid-column: 1 / -1;
  font-size: 14px;
  font-weight: 800;
  color: #94a3b8;
  margin: 40px 0 20px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: flex;
  align-items: center;
  gap: 16px;

  &:after {
    content: '';
    flex: 1;
    height: 1px;
    background: #f1f5f9;
  }
`;

export const FullWidthWrapper = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  font-size: 15px;
  color: #475569;
  padding: 12px 16px;
  background: #f8fafc;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s;

  &:hover {
    background: #f1f5f9;
  }

  input {
    width: 20px;
    height: 20px;
    cursor: pointer;
    accent-color: #841013;
  }
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
