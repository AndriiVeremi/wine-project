import styled from 'styled-components';
import { FaWineGlass } from 'react-icons/fa';

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  border: 1px dashed var(--secondary-gray);
  margin: 40px 0 80px;
  backdrop-filter: blur(10px);
  width: 100%;
  box-sizing: border-box;

  /* Адаптивна висота */
  min-height: 550px;
  padding: 80px 20px;

  @media (max-width: 1024px) {
    min-height: 450px;
  }

  @media (max-width: 767px) {
    min-height: 350px;
    margin-bottom: 40px;
  }
`;

const IconWrapper = styled.div`
  font-size: 64px;
  color: var(--secondary-gray);
  margin-bottom: 24px;
  opacity: 0.2;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    position: absolute;
    width: 70px;
    height: 2px;
    background: var(--secondary-gray);
    transform: rotate(-45deg);
    opacity: 0.4;
  }

  @media (max-width: 767px) {
    font-size: 48px;
  }
`;

const StyledTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: var(--black-color);
  margin-bottom: 8px;
`;

const StyledText = styled.p`
  font-size: 16px;
  color: var(--secondary-gray);
  max-width: 450px;
  line-height: 1.5;
  margin: 0;
`;

interface EmptyMessageProps {
  title?: string;
  message: string;
}

const EmptyMessage = ({ title = 'No results found', message }: EmptyMessageProps) => {
  return (
    <MessageWrapper>
      <IconWrapper>
        <FaWineGlass />
      </IconWrapper>
      <StyledTitle>{title}</StyledTitle>
      <StyledText>{message}</StyledText>
    </MessageWrapper>
  );
};

export default EmptyMessage;
