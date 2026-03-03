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
  margin-top: 45px;
`;

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error: globalError, clearError } = useAuthStore();

  useEffect(() => {
    if (globalError) {
      toast.error(globalError);
      clearError();
    }
  }, [globalError, clearError]);

  const validate = () => {
    const errors: string[] = [];
    if (!email) {
      errors.push('E-mail is required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.push('E-mail is invalid');
    }
    if (!password) {
      errors.push('Password is required');
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (validationErrors.length > 0) {
      validationErrors.forEach((err) => toast.error(err));
      return;
    }
    await login(email, password);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FieldWrapper>
        <Label htmlFor="login-email">E-mail: *</Label>
        <Input
          id="login-email"
          type="email"
          placeholder="Your E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </FieldWrapper>

      <FieldWrapper>
        <Label htmlFor="login-password">Password: *</Label>
        <PasswordWrapper>
          <Input
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <PasswordToggle
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <FiEye color="var(--icon-gray)" />
            ) : (
              <FiEyeOff color="var(--icon-gray)" />
            )}
          </PasswordToggle>
        </PasswordWrapper>
        <ForgotPassword type="button">I forgot my password</ForgotPassword>
      </FieldWrapper>

      <LoginFormButtonWrapper>
        <MainButton type="submit" size="large">
          {isLoading ? 'Logging in...' : 'LOG IN'}
        </MainButton>
      </LoginFormButtonWrapper>
    </FormContainer>
  );
};

export default LoginForm;
