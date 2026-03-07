import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';
import MainButton from '@/components/buttons/MainButton';
import FormField from '@/components/common/FormField/FormField';
import styled from 'styled-components';
import {
  FormContainer,
  PasswordWrapper,
  PasswordToggle,
  ForgotPassword,
} from '@/components/forms/Form.styled';

const LoginFormButtonWrapper = styled.div`
  margin-top: 30px;
`;

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const { login, isLoading, error, clearError } = useAuthStore();

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error('Password is too short');
      return;
    }

    await login(email, password);
  };

  return (
    <FormContainer onSubmit={onLogin}>
      <FormField
        label="Email"
        id="email"
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', position: 'relative' }}>
        <label style={{ fontSize: '16px', color: 'var(--primary-gray)' }}>Password *</label>
        <PasswordWrapper>
          <input
            style={{
              width: '100%',
              height: '45px',
              padding: '0 20px',
              border: '1px solid var(--secondary-gray)',
              borderRadius: 'var(--border-radius-in)',
              fontFamily: 'var(--font-main)',
              fontSize: '14px',
              outline: 'none',
            }}
            type={visible ? 'text' : 'password'}
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <PasswordToggle type="button" onClick={() => setVisible(!visible)}>
            {visible ? <FiEye /> : <FiEyeOff />}
          </PasswordToggle>
        </PasswordWrapper>
        <ForgotPassword type="button">Forgot password?</ForgotPassword>
      </div>

      <LoginFormButtonWrapper>
        <MainButton type="submit" size="large">
          {isLoading ? 'Wait...' : 'Login'}
        </MainButton>
      </LoginFormButtonWrapper>
    </FormContainer>
  );
};

export default LoginForm;
