import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/auth/authStore';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';
import MainButton from '@/components/Buttons/MainButton';
import FormField from '@/components/Common/FormField/FormField';
import styled from 'styled-components';
import {
  FormContainer,
  PasswordWrapper,
  PasswordToggle,
  ForgotPassword,
  FieldWrapper,
  Label,
  Input,
} from '@/components/Forms/AuthForm/Form.styled';

const LoginFormButtonWrapper = styled.div`
  margin-top: 30px;
`;

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const { login, resetPassword, resendVerification, isLoading, error, clearError } = useAuthStore();

  useEffect(() => {
    if (error) {
      toast.error(error);
      if (error.includes('verify your email')) {
        setShowResend(true);
      }
      clearError();
    }
  }, [error, clearError]);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowResend(false);

    if (password.length < 6) {
      toast.error('Password is too short');
      return;
    }

    await login(email, password);
  };

  const onResendEmail = async () => {
    try {
      await resendVerification(email, password);
      toast.success('Verification email sent! Please check your inbox.');
      setShowResend(false);
    } catch {}
  };

  const onForgotPassword = async () => {
    if (!email) {
      toast.error('Please enter your email address first');
      return;
    }

    try {
      await resetPassword(email);
      toast.success('Password reset email sent! Check your inbox.');
    } catch {}
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

      <FieldWrapper>
        <Label htmlFor="password">Password *</Label>
        <PasswordWrapper>
          <Input
            id="password"
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
        <ForgotPassword type="button" onClick={onForgotPassword}>
          Forgot password?
        </ForgotPassword>
      </FieldWrapper>

      <LoginFormButtonWrapper>
        <MainButton type="submit" size="large" centered disabled={isLoading}>
          {isLoading ? 'Wait...' : 'Login'}
        </MainButton>
        {showResend && (
          <div style={{ marginTop: '15px', textAlign: 'center' }}>
            <MainButton type="button" onClick={onResendEmail} disabled={isLoading}>
              Resend verification email
            </MainButton>
          </div>
        )}
      </LoginFormButtonWrapper>
    </FormContainer>
  );
};

export default LoginForm;
