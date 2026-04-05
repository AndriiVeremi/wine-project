import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useScrollLock } from '@/hooks/useScrollLock';
import './AgeVerificationModal.css';

const AgeVerificationModal: React.FC = () => {
  const [show, setShow] = useState(false);

  useScrollLock(show);

  useEffect(() => {
    const isOver18 = localStorage.getItem('isOver18');
    if (!isOver18) {
      setShow(true);
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem('isOver18', 'true');
    setShow(false);
  };

  const handleDecline = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!show) return null;

  return createPortal(
    <div className="age-verification-overlay">
      <div className="age-verification-modal">
        <h2 className="age-verification-title">Вам вже виповнилося 18 років?</h2>
        <p className="age-verification-text">
          Цей сайт містить інформацію про алкогольні напої. Натискаючи «Так», ви підтверджуєте, що
          вам виповнилося 18 років.
        </p>
        <div className="age-verification-actions">
          <button className="age-btn age-btn-confirm" onClick={handleConfirm}>
            Так, мені є 18
          </button>
          <button className="age-btn age-btn-decline" onClick={handleDecline}>
            Ні, мені менше 18
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default AgeVerificationModal;
