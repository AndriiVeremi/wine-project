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

import AIAssistantMessage from './components/AIAssistantMessage';

interface ChatUIMessage {
  role: 'user' | 'ai';
  text: string;
}

const AIAssistant: React.FC = () => {
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatUIMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const storageKey = user ? `wine_chat_${user.uid}` : null;

  useEffect(() => {
    if (storageKey) {
      const savedMessages = sessionStorage.getItem(`${storageKey}_msgs`);
      const savedHistory = sessionStorage.getItem(`${storageKey}_hist`);

      if (savedMessages && savedHistory) {
        setMessages(JSON.parse(savedMessages));
        setChatHistory(JSON.parse(savedHistory));
      } else {
        const firstName = user?.displayName?.split(' ')[0] || '';
        setMessages([
          {
            role: 'ai',
            text: JSON.stringify({
              text: `Hello${firstName ? `, ${firstName}` : ''}! I am your wine assistant. Would you like help choosing a wine or information about wine regions?`,
              wines: [],
              tours: [],
            }),
          },
        ]);
        setChatHistory([]);
      }
    }
  }, [storageKey, user?.displayName]);
  useEffect(() => {
    if (storageKey && messages.length > 0) {
      const limitedMessages = messages.slice(-20);
      const limitedHistory = chatHistory.slice(-20);

      sessionStorage.setItem(`${storageKey}_msgs`, JSON.stringify(limitedMessages));
      sessionStorage.setItem(`${storageKey}_hist`, JSON.stringify(limitedHistory));
    }
  }, [messages, chatHistory, storageKey]);

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
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Sorry, an error occurred. Please try again later.';
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          text: JSON.stringify({
            text: errorMessage,
            wines: [],
            tours: [],
          }),
        },
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
                {msg.role === 'ai' ? <AIAssistantMessage content={msg.text} /> : msg.text}
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
