import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import LoginForm from '@/components/Forms/AuthForm/LoginForm';
import RegisterForm from '@/components/Forms/AuthForm/RegisterForm';
import {
  ModalOverlay,
  ModalContainer,
  CloseButton,
  TabsContainer,
  Tab,
  FormWrapper,
} from './AuthModal.styled';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialTab = 'login' }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen]);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer>
        <CloseButton onClick={onClose} aria-label="Close modal">
          <IoClose />
        </CloseButton>

        <TabsContainer>
          <Tab $active={activeTab === 'login'} onClick={() => setActiveTab('login')}>
            Login
          </Tab>
          <Tab $active={activeTab === 'register'} onClick={() => setActiveTab('register')}>
            Registration
          </Tab>
        </TabsContainer>

        <FormWrapper>{activeTab === 'login' ? <LoginForm /> : <RegisterForm />}</FormWrapper>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default AuthModal;
