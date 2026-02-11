import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    gap: '1rem',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
  },
} as const;

const RegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'USER' | 'WINERY_OWNER'>('USER');
  const [formError, setFormError] = useState('');
  const { register, isLoading, error: globalError, clearError } = useAuthStore();

  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setFormError('');

    if (password !== confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }

    await register({
      firstName,
      lastName,
      email,
      password,
      role,
    });
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
        style={styles.input}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password (min. 6 characters)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        style={styles.input}
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value as 'USER' | 'WINERY_OWNER')}
        style={styles.input}
      >
        <option value="USER">I am a regular user</option>
        <option value="WINERY_OWNER">I am a winery owner</option>
      </select>
      <button type="submit" disabled={isLoading} style={styles.button}>
        {isLoading ? 'Registering...' : 'Register'}
      </button>
      {/* Display either a local form error or a global error from the store */}
      {formError && <p style={styles.error}>{formError}</p>}
      {globalError && <p style={styles.error}>{globalError}</p>}
    </form>
  );
};

export default RegisterForm;
