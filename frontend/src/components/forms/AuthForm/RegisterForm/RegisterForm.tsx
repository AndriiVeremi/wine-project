import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/auth/authStore';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';
import MainButton from '@/components/buttons/MainButton';
import FormField from '@/components/common/FormField/FormField';
import styled from 'styled-components';
import {
  FormContainer,
  PasswordWrapper,
  PasswordToggle,
} from '@/components/forms/AuthForm/Form.styled';

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
  const [visibleConfirm, setVisibleConfirm] = useState(false);

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
      <FormField
        label="First Name"
        id="fName"
        placeholder="First Name"
        value={fName}
        onChange={(e) => setFName(e.target.value)}
        required
      />

      <FormField
        label="Last Name"
        id="lName"
        placeholder="Last Name"
        value={lName}
        onChange={(e) => setLName(e.target.value)}
        required
      />

      <FormField
        label="I am a:"
        id="role"
        isSelect
        value={role}
        onChange={(e) => setRole(e.target.value as 'USER' | 'WINERY_OWNER')}
        required
        options={[
          { value: 'USER', label: 'User' },
          { value: 'WINERY_OWNER', label: 'Winery Owner' },
        ]}
      />

      <FormField
        label="Email"
        id="email"
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* Password */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
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
            placeholder="Min 6 characters"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
          <PasswordToggle type="button" onClick={() => setVisible(!visible)}>
            {visible ? <FiEye /> : <FiEyeOff />}
          </PasswordToggle>
        </PasswordWrapper>
      </div>

      {/* Confirm Password */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '16px', color: 'var(--primary-gray)' }}>Confirm Password *</label>
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
            type={visibleConfirm ? 'text' : 'password'}
            placeholder="Repeat password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            required
          />
          <PasswordToggle type="button" onClick={() => setVisibleConfirm(!visibleConfirm)}>
            {visibleConfirm ? <FiEye /> : <FiEyeOff />}
          </PasswordToggle>
        </PasswordWrapper>
      </div>

      <RegisterFormButtonWrapper>
        <MainButton type="submit" size="large">
          {isLoading ? 'Registering...' : 'Sign Up'}
        </MainButton>
      </RegisterFormButtonWrapper>
    </FormContainer>
  );
};

export default RegisterForm;
