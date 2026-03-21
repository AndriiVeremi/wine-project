import React, { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { FiPhone, FiMail } from 'react-icons/fi';
import {
  ContactModalOverlay,
  ContactModalContainer,
  CloseBtn,
  WineryLogo,
  ModalTitle,
  ContactList,
  ContactLink,
  InfoFooter,
} from './WineryContactModal.styled';
import type { Winery } from '@/types/wineries';
import MainButton from '@/components/Buttons/MainButton';

interface Props {
  winery: Winery;
  isOpen: boolean;
  onClose: () => void;
}

const WineryContactModal: React.FC<Props> = ({ winery, isOpen, onClose }) => {
  // Забороняємо скрол при відкритій модалці
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <ContactModalOverlay onClick={handleOverlayClick}>
      <ContactModalContainer>
        <CloseBtn onClick={onClose} aria-label="Close">
          <IoClose />
        </CloseBtn>

        {winery.logoUrl && <WineryLogo src={winery.logoUrl} alt={winery.name} />}
        <ModalTitle>{winery.name}</ModalTitle>

        <InfoFooter>To book this tour, please contact the winery directly.</InfoFooter>

        <ContactList>
          {winery.contactPhone && (
            <ContactLink
              href={`tel:${winery.contactPhone}`}
              aria-label={`Call ${winery.contactPhone}`}
            >
              <div className="icon-wrapper">
                <FiPhone />
              </div>
              <span>{winery.contactPhone}</span>
            </ContactLink>
          )}

          {winery.contactEmail && (
            <div style={{ marginTop: '10px' }}>
              <a
                href={`mailto:${winery.contactEmail}`}
                style={{ textDecoration: 'none' }}
                aria-label={`Send email to ${winery.contactEmail}`}
              >
                <MainButton size="medium" fullWidth>
                  <FiMail style={{ marginRight: '10px' }} />
                  Send Email to Winery
                </MainButton>
              </a>
              <p
                style={{
                  textAlign: 'center',
                  fontSize: '13px',
                  marginTop: '8px',
                  color: 'var(--secondary-gray)',
                }}
              >
                {winery.contactEmail}
              </p>
            </div>
          )}
        </ContactList>

        <InfoFooter style={{ fontSize: '12px', marginTop: '10px' }}>
          Our platform provides information only. Actual booking and payments are handled by the
          winery.
        </InfoFooter>
      </ContactModalContainer>
    </ContactModalOverlay>
  );
};

export default WineryContactModal;
