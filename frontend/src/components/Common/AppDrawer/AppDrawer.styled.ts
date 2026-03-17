import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  z-index: 999;
`;

export const DrawerContainer = styled.div<{ $open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 340px;
  max-width: 90%;
  height: 100vh;
  background: var(--bg-primary);
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;

  transform: translateX(${(p) => (p.$open ? '0' : '100%')});
  transition: transform 0.3s ease;

  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
