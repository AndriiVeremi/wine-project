import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';
import MainButton from '@/components/buttons/MainButton';
import styled from 'styled-components';
import {
  FormContainer,
  FieldWrapper,
  Label,
  Input,
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
      <FieldWrapper>
        <Label>Email</Label>
        <Input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </FieldWrapper>

      <FieldWrapper>
        <Label>Password</Label>
        <PasswordWrapper>
          <Input
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
      </FieldWrapper>

      <LoginFormButtonWrapper>
        <MainButton type="submit" size="large">
          {isLoading ? 'Wait...' : 'Login'}
        </MainButton>
      </LoginFormButtonWrapper>
    </FormContainer>
  );
};

export default LoginForm;
