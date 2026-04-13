import React, { useState, useEffect, useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import { chatWithAI, type ChatMessage } from '@/api/aiApi';
import { useAuthStore } from '@/store/auth/authStore';
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
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    {
      role: 'ai',
      text: 'Hello! I am your wine assistant. Would you like help choosing a wine or information about wine regions?',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [hasNudged, setHasNudged] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen && !hasNudged && user) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasNudged(true);
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, hasNudged, user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = inputText;
    setInputText('');
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await chatWithAI(userMessage, chatHistory);

      setMessages((prev) => [...prev, { role: 'ai', text: response }]);

      setChatHistory((prev) => [
        ...prev,
        { role: 'user', parts: [{ text: userMessage }] },
        { role: 'model', parts: [{ text: response }] },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'ai', text: 'Sorry, an error occurred. Please try again later.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!user) return null;

  return (
    <Container>
      {isOpen ? (
        <ChatWindow>
          <ChatHeader>
            <span>AI Sommelier</span>
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
