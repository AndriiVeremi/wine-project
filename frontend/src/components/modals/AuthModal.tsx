import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import Modal from '../common/Modal';
import LoginForm from '../forms/LoginForm';
import RegisterForm from '../forms/RegisterForm';

const styles = {
  toggleText: {
    marginTop: '1rem',
    textAlign: 'center',
    fontSize: '0.9rem',
  },
  toggleLink: {
    color: '#007bff',
    textDecoration: 'underline',
    cursor: 'pointer',
    marginLeft: '5px',
  },
} as const;

type AuthView = 'login' | 'register';

const AuthModal = () => {
  const { isAuthModalOpen, authModalView, closeAuthModal } = useAuthStore();
  const [view, setView] = useState<AuthView>('login');
  useEffect(() => {
    if (isAuthModalOpen) {
      setView(authModalView);
    }
  }, [isAuthModalOpen, authModalView]);

  const toggleView = () => {
    setView((currentView) => (currentView === 'login' ? 'register' : 'login'));
  };

  return (
    <Modal isOpen={isAuthModalOpen} onClose={closeAuthModal}>
      {view === 'login' ? (
        <div>
          <h2>Вхід</h2>
          <LoginForm />
          <p style={styles.toggleText}>
            Немає акаунту?
            <span style={styles.toggleLink} onClick={toggleView}>
              Зареєструватися
            </span>
          </p>
        </div>
      ) : (
        <div>
          <h2>Реєстрація</h2>
          <RegisterForm />
          <p style={styles.toggleText}>
            Вже є акаунт?
            <span style={styles.toggleLink} onClick={toggleView}>
              Увійти
            </span>
          </p>
        </div>
      )}
    </Modal>
  );
};

export default AuthModal;
