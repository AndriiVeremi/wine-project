import styled from 'styled-components';
import mapBg from '@/assets/map.svg';

export const MapWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(${mapBg}) no-repeat center center;
  background-size: contain;
  aspect-ratio: 1223 / 625;

  svg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export const Tooltip = styled.div.attrs<{ $x: number; $y: number; $show: boolean }>(
  (props) => ({
    style: {
      left: `${props.$x}px`,
      top: `${props.$y}px`,
    },
  })
)`
  position: fixed;
  transform: translate(-50%, -130%);
  background: rgba(255, 228, 189, 0.95);
  color: var(--primary-wine);
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  pointer-events: none;
  z-index: 1000;
  white-space: nowrap;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  opacity: ${(props) => (props.$show ? 1 : 0)};
  transition: opacity 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -6px;
    transform: translateX(-50%);
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid rgba(255, 228, 189, 0.95);
  }
`;
