import styled from 'styled-components';

export const BadgeWrapper = styled.div<{
  size: number;
  bg: string;
  color: string;
}>`
  position: relative;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: ${({ bg }) => bg};
  color: ${({ color }) => color};
  border-radius: 50%;
  font-family: var(--font-main);
  font-weight: 500;
  font-size: ${({ size }) => size * 0.35}px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
`;
