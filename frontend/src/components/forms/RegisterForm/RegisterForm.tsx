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
  margin-top: 40px;
`;

const RegisterForm = () => {
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [role, setRole] = useState<'USER' | 'WINERY_OWNER'>('USER');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [visible, setVisible] = useState(false);

  const { register, isLoading, error, clearError } = useAuthStore();

  useEffect(() => {
    if (error) {
      toast.error(typeof error === 'string' ? error : 'Registration failed');
      clearError();
    }
  }, [error, clearError]);

  const onRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (pass !== confirmPass) {
      toast.error('Passwords do not match');
      return;
    }

    await register({
      firstName: fName,
      lastName: lName,
      role,
      email,
      password: pass,
    });
  };

  return (
    <FormContainer onSubmit={onRegister}>
      <FieldWrapper>
        <Label>First Name</Label>
        <Input
          placeholder="First Name"
          value={fName}
          onChange={(e) => setFName(e.target.value)}
          required
        />
      </FieldWrapper>

      <FieldWrapper>
        <Label>Last Name</Label>
        <Input
          placeholder="Last Name"
          value={lName}
          onChange={(e) => setLName(e.target.value)}
          required
        />
      </FieldWrapper>

      <FieldWrapper>
        <Label>I am a:</Label>
        <Select
          value={role}
          onChange={(e) => setRole(e.target.value as 'USER' | 'WINERY_OWNER')}
          required
        >
          <option value="USER">User</option>
          <option value="WINERY_OWNER">Winery Owner</option>
        </Select>
      </FieldWrapper>

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
            placeholder="Min 6 characters"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
          <PasswordToggle type="button" onClick={() => setVisible(!visible)}>
            {visible ? <FiEye /> : <FiEyeOff />}
          </PasswordToggle>
        </PasswordWrapper>
      </FieldWrapper>

      <FieldWrapper>
        <Label>Confirm Password</Label>
        <Input
          type="password"
          placeholder="Repeat password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          required
        />
      </FieldWrapper>

      <RegisterFormButtonWrapper>
        <MainButton type="submit" size="large">
          {isLoading ? 'Registering...' : 'Sign Up'}
        </MainButton>
      </RegisterFormButtonWrapper>
    </FormContainer>
  );
};

export default RegisterForm;
