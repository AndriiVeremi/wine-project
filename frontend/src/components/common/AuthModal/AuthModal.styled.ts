import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--overlay);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
`;

export const ModalContainer = styled.div`
  background-color: var(--white);
  width: 100%;
  max-width: 550px;
  padding: 40px 0;
  border-radius: var(--border-radius-lg);
  position: relative;
  box-shadow: var(--modal-shadow);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1100px) {
    width: 90%;
    padding: 30px 0;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: -45px;
  right: -50px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: var(--transition);
  color: var(--white);

  &:hover {
    transform: scale(1.1);
    opacity: 0.8;
    color: var(--primary-wine);
  }

  svg {
    width: 40px;
    height: 40px;
    fill: currentColor;
    stroke: currentColor;
    stroke-width: 2px;
  }

  @media (max-width: 1100px) {
    top: 12px;
    right: 12px;
    color: var(--primary-gray);

    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 30px;
`;

export const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  background: none;
  border: none;
  font-family: var(--font-main);
  font-weight: 600;
  font-size: 28px;
  line-height: 1.2;
  color: ${(props) => (props.$active ? 'var(--primary-wine)' : 'var(--secondary-gray)')};
  cursor: pointer;
  padding: 15px 0;
  transition: var(--transition);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: ${(props) => (props.$active ? 'var(--primary-wine)' : 'transparent')};
    transition: var(--transition);
  }

  &:hover {
    color: var(--primary-gray);
  }
`;

export const FormWrapper = styled.div`
  width: 100%;
  max-width: 450px;
`;
