import styled from 'styled-components';
import { breakpoints } from '@/styles/breakpoints';

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  minheight: 50vh;
  padding: 40px;
  textalign: center;
`;

export const ErrorTitle = styled.h2`
  color: var(--accent-color, #841013);
  margin-bottom: 16px;
  font-size: 24px;

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 32px;
  }
`;

export const ErrorMessage = styled.p`
  color: var(--secondary-gray, #666);
  margin-bottom: 24px;
  font-size: 16px;
  max-width: 500px;
`;

export const ReloadButton = styled.button`
  padding: 12px 24px;
  background-color: var(--accent-color, #841013);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;
