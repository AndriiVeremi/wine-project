import styled from 'styled-components';
import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi';

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: rgba(255, 235, 235, 0.5);
  border-radius: 20px;
  border: 1px dashed #ff4d4f;
  backdrop-filter: blur(10px);
  width: 100%;
  box-sizing: border-box;
  min-height: 400px;
  padding: 60px 20px;
  margin-bottom: 40px;

  @media (min-width: 1200px) {
    margin-bottom: 60px;
  }
`;

const IconWrapper = styled.div`
  font-size: 64px;
  color: #ff4d4f;
  margin-bottom: 24px;
  opacity: 0.8;
`;

const StyledTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: var(--black-color);
  margin-bottom: 12px;
`;

const StyledText = styled.p`
  font-size: 16px;
  color: var(--secondary-gray);
  max-width: 500px;
  line-height: 1.6;
  margin-bottom: 30px;
`;

const RetryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--accent-color);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--accent-hover-color);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    font-size: 18px;
  }
`;

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

const ErrorMessage = ({
  title = 'Loading Error',
  message,
  onRetry = () => window.location.reload(),
}: ErrorMessageProps) => {
  return (
    <ErrorWrapper>
      <IconWrapper>
        <FiAlertCircle />
      </IconWrapper>
      <StyledTitle>{title}</StyledTitle>
      <StyledText>{message}</StyledText>
      <RetryButton onClick={onRetry}>
        <FiRefreshCw /> Retry
      </RetryButton>
    </ErrorWrapper>
  );
};

export default ErrorMessage;
