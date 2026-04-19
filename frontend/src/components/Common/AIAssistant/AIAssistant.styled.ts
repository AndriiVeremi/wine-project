import styled, { keyframes } from 'styled-components';

const pulseGlow = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(132, 16, 19, 0.7), 0 0 20px rgba(132, 16, 19, 0.4); }
  70% { box-shadow: 0 0 0 15px rgba(132, 16, 19, 0), 0 0 30px rgba(132, 16, 19, 0.6); }
  100% { box-shadow: 0 0 0 0 rgba(132, 16, 19, 0), 0 0 20px rgba(132, 16, 19, 0.4); }
`;

const floating = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const liquidWave = keyframes`
  0% { border-radius: 45% 55% 50% 50% / 45% 45% 55% 55%; }
  33% { border-radius: 55% 45% 55% 45% / 55% 55% 45% 45%; }
  66% { border-radius: 45% 55% 45% 55% / 45% 55% 45% 55%; }
  100% { border-radius: 45% 55% 50% 50% / 45% 45% 55% 55%; }
`;

export const Container = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
  z-index: 1000;
  font-family: var(--font-main, 'Montserrat', sans-serif);

  @media (max-width: 767px) {
    bottom: 130px;
    right: 30px;
  }
`;

export const OpenButton = styled.button`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background: linear-gradient(135deg, #841013 0%, #4a080a 100%);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  animation:
    ${pulseGlow} 3s infinite,
    ${floating} 4s ease-in-out infinite,
    ${liquidWave} 6s ease-in-out infinite;
  backdrop-filter: blur(8px);
  box-shadow: 0 10px 30px rgba(132, 16, 19, 0.4);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.4s;
  }

  &:hover {
    transform: scale(1.1) translateY(-5px);
    box-shadow: 0 15px 40px rgba(132, 16, 19, 0.6);
    background: linear-gradient(135deg, #a51419 0%, #841013 100%);

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
    z-index: 2;
  }
`;

export const ChatWindow = styled.div`
  position: absolute;
  bottom: 85px;
  right: 0;
  width: 450px;
  height: min(700px, 80vh);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: fadeIn 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);

  @media (max-width: 500px) {
    width: calc(100vw - 40px);
    right: -10px;
    height: min(600px, 80vh);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

export const ChatHeader = styled.div`
  padding: 20px;
  background: #841013;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 18px;
    font-weight: 700;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 10px;

    &::before {
      content: '';
      width: 8px;
      height: 8px;
      background: #4caf50;
      border-radius: 50%;
      box-shadow: 0 0 10px #4caf50;
    }
  }
`;

export const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(90deg);
  }
`;

export const MessagesContainer = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: linear-gradient(to bottom, transparent, rgba(132, 16, 19, 0.02));

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(132, 16, 19, 0.2);
    border-radius: 10px;
  }
`;

export const Message = styled.div<{ $isUser: boolean }>`
  padding: 12px 18px;
  border-radius: ${({ $isUser }) => ($isUser ? '20px 20px 4px 20px' : '20px 20px 20px 4px')};
  max-width: 85%;
  font-size: 15px;
  line-height: 1.6;
  white-space: pre-wrap;
  align-self: ${({ $isUser }) => ($isUser ? 'flex-end' : 'flex-start')};
  background: ${({ $isUser }) => ($isUser ? '#841013' : 'white')};
  color: ${({ $isUser }) => ($isUser ? 'white' : '#333')};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: ${({ $isUser }) => ($isUser ? 'none' : '1px solid #f0f0f0')};
`;

export const InputContainer = styled.div`
  padding: 20px;
  background: white;
  border-top: 1px solid #f0f0f0;
  display: flex;
  gap: 12px;
`;

export const Input = styled.input`
  flex: 1;
  padding: 12px 20px;
  border: 1px solid #e0e0e0;
  border-radius: 25px;
  outline: none;
  font-size: 14px;
  transition: all 0.3s ease;

  &:focus {
    border-color: #841013;
    box-shadow: 0 0 0 4px rgba(132, 16, 19, 0.1);
  }
`;

export const SendButton = styled.button<{ disabled?: boolean }>`
  background: ${({ disabled }) => (disabled ? '#f0f0f0' : '#841013')};
  color: ${({ disabled }) => (disabled ? '#ccc' : 'white')};
  border: none;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    transform: scale(1.05);
    background: #a51419;
  }
`;
