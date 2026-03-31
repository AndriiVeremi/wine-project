import React from 'react';
import { IoClose } from 'react-icons/io5';
import { useAuthStore } from '@/store/auth/authStore';
import { useAIAssistant } from './useAIAssistant';
import {
  Container,
  OpenButton,
  ChatWindow,
  ChatHeader,
  CloseButton,
  MessagesContainer,
  Message,
  InputContainer,
  Input,
  SendButton,
} from './AIAssistant.styled';

const AIAssistant: React.FC = () => {
  const { user } = useAuthStore();
  const {
    isOpen,
    messages,
    inputText,
    isLoading,
    messagesEndRef,
    setInputText,
    handleSendMessage,
    handleKeyPress,
    setIsOpen,
  } = useAIAssistant();

  if (!user) return null;

  return (
    <Container>
      {isOpen ? (
        <ChatWindow>
          <ChatHeader>
            <span>AI Assistant</span>
            <CloseButton onClick={() => setIsOpen(false)} aria-label="Close AI assistant">
              <IoClose />
            </CloseButton>
          </ChatHeader>
          <MessagesContainer>
            {messages.map((msg, index) => (
              <Message key={index} $isUser={msg.role === 'user'}>
                {msg.text}
              </Message>
            ))}
            {isLoading && <Message $isUser={false}>Thinking...</Message>}
            <div ref={messagesEndRef} />
          </MessagesContainer>
          <InputContainer>
            <Input
              type="text"
              placeholder="Ask something..."
              aria-label="Type your message to AI assistant"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <SendButton onClick={handleSendMessage} disabled={isLoading} aria-label="Send message">
              ➤
            </SendButton>
          </InputContainer>
        </ChatWindow>
      ) : (
        <OpenButton onClick={() => setIsOpen(true)} aria-label="Open AI assistant">
          🍷
        </OpenButton>
      )}
    </Container>
  );
};

export default AIAssistant;
