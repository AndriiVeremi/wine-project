import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  font-family: 'Inter', sans-serif;
`;

export const OpenButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #722f37;
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export const ChatWindow = styled.div`
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 450px;
  height: min(700px, 80vh);
  max-height: calc(100vh - 100px);
  background: white;
  border-radius: 15px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #eee;

  @media (max-width: 500px) {
    width: 320px;
    height: min(600px, 80vh);
  }
`;

export const ChatHeader = styled.div`
  padding: 15px;
  background: #722f37;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const MessagesContainer = styled.div`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Message = styled.div<{ $isUser: boolean }>`
  padding: 10px 14px;
  border-radius: 12px;
  max-width: 85%;
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
  align-self: ${({ $isUser }) => ($isUser ? 'flex-end' : 'flex-start')};
  background: ${({ $isUser }) => ($isUser ? '#722f37' : '#f0f0f0')};
  color: ${({ $isUser }) => ($isUser ? 'white' : '#333')};

  & > ul,
  & > ol {
    padding-left: 20px;
    margin: 5px 0;
  }

  & > p {
    margin: 5px 0;
  }
`;

export const InputContainer = styled.div`
  padding: 15px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 10px;
`;

export const Input = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 20px;
  outline: none;
`;

export const SendButton = styled.button<{ disabled?: boolean }>`
  background: ${({ disabled }) => (disabled ? '#ccc' : '#722f37')};
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 15px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;
