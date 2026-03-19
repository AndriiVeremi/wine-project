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
  font-size: 18px;
  font-weight: 700;
  color: #841013;
  margin: 40px 0 20px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
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
  padding: 14px 18px;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #cbd5e1;
  transition: all 0.2s;
  user-select: none;

  &:hover {
    border-color: #841013;
    background: #fffafa;
  }

  &:hover input {
    border-color: #841013;
  }

  input {
    appearance: none;
    width: 22px;
    height: 22px;
    border: 2px solid #94a3b8;
    border-radius: 6px;
    background: #ffffff;
    cursor: pointer;
    position: relative;
    transition: all 0.2s;
    flex-shrink: 0;

    &:checked {
      background: #841013;
      border-color: #841013;
    }

    &:checked::after {
      content: '';
      position: absolute;
      left: 6px;
      top: 2px;
      width: 6px;
      height: 11px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }

    &:focus {
      box-shadow: 0 0 0 3px rgba(132, 16, 19, 0.1);
    }
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
