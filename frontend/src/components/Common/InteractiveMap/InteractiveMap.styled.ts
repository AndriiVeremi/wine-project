import styled from 'styled-components';

export const MapWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 100%;
    height: auto;
  }

  .region-link {
    outline: none;
    transition: all 0.3s ease;
  }

  .region-path {
    fill: #ffe4bd;
    stroke: #841013;
    stroke-width: 1;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      fill: #f0c99a;
      filter: brightness(0.95);
    }
  }

  .label-path {
    fill: #841013;
    pointer-events: none;
  }

  .active-region .region-path {
    fill: #f0c99a;
  }
`;

export const Tooltip = styled.div<{ $x: number; $y: number; $show: boolean }>`
  position: fixed;
  left: ${(props) => props.$x}px;
  top: ${(props) => props.$y}px;
  transform: translate(-50%, -130%);
  background: rgba(132, 16, 19, 0.95);
  color: white;
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
    border-top: 6px solid rgba(132, 16, 19, 0.95);
  }
`;
