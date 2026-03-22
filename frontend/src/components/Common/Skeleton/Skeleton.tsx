import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% {
    background-color: #ffeacb;
  }
  50% {
    background-color: #f5ddb3;
  }
  100% {
    background-color: #ffeacb;
  }
`;

interface SkeletonProps {
  width?: string;
  height?: string;
  $borderRadius?: string;
  $margin?: string;
}

export const Skeleton = styled.div<SkeletonProps>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '20px'};
  border-radius: ${({ $borderRadius }) => $borderRadius || '4px'};
  margin: ${({ $margin }) => $margin || '0'};
  animation: ${pulse} 1.5s ease-in-out infinite;
  display: inline-block;
`;

export default Skeleton;
