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
  Select,
} from '@/components/forms/Form.styled';

const RegisterFormButtonWrapper = styled.div`
  margin-top: 70px;
`;

const RegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState<'USER' | 'WINERY_OWNER'>('USER');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, isLoading, error: globalError, clearError } = useAuthStore();

  type BackendError = {
    field?: string;
    message: string;
  };

  useEffect(() => {
    if (globalError) {
      if (Array.isArray(globalError)) {
        (globalError as BackendError[]).forEach((err) =>
          toast.error(err.message || 'Registration failed'),
        );
      } else {
        toast.error(globalError);
      }
      clearError();
    }
  }, [globalError, clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    await register({ firstName, lastName, role, email, password });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FieldWrapper>
        <Label htmlFor="reg-firstName">First Name: *</Label>
        <Input
          id="reg-firstName"
          type="text"
          placeholder="Your First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </FieldWrapper>

      <FieldWrapper>
        <Label htmlFor="reg-lastName">Last Name: *</Label>
        <Input
          id="reg-lastName"
          type="text"
          placeholder="Your Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </FieldWrapper>

      <FieldWrapper>
        <Label htmlFor="reg-role">Role: *</Label>
        <Select
          id="reg-role"
          value={role}
          onChange={(e) => setRole(e.target.value as 'USER' | 'WINERY_OWNER')}
          required
        >
          <option value="USER">User</option>
          <option value="WINERY_OWNER">Winery</option>
        </Select>
      </FieldWrapper>

      <FieldWrapper>
        <Label htmlFor="reg-email">E-mail: *</Label>
        <Input
          id="reg-email"
          type="email"
          placeholder="Your E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </FieldWrapper>

      <FieldWrapper>
        <Label htmlFor="reg-password">Password: *</Label>
        <PasswordWrapper>
          <Input
            id="reg-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <PasswordToggle type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <FiEye color="var(--icon-gray)" />
            ) : (
              <FiEyeOff color="var(--icon-gray)" />
            )}
          </PasswordToggle>
        </PasswordWrapper>
      </FieldWrapper>

      <FieldWrapper>
        <Label htmlFor="reg-confirmPassword">Confirm Password: *</Label>
        <PasswordWrapper>
          <Input
            id="reg-confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="At least 8 characters"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <PasswordToggle
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <FiEye color="var(--icon-gray)" />
            ) : (
              <FiEyeOff color="var(--icon-gray)" />
            )}
          </PasswordToggle>
        </PasswordWrapper>
      </FieldWrapper>

      <RegisterFormButtonWrapper>
        <MainButton type="submit" size="large">
          {isLoading ? 'Registering...' : 'REGISTER'}
        </MainButton>
      </RegisterFormButtonWrapper>
    </FormContainer>
  );
};

export default RegisterForm;
