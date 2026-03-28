import styled, { css } from 'styled-components';
import { breakpoints } from '@/styles/breakpoints';

interface StyledLoaderContainerProps {
  $isFullScreen?: boolean;
}

export const StyledLoaderContainer = styled.div<StyledLoaderContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  ${({ $isFullScreen }) =>
    $isFullScreen &&
    css`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9999;
      background-color: rgba(255, 255, 255, 0.5);
    `}

  ${({ $isFullScreen }) =>
    !$isFullScreen &&
    css`
      padding: 2rem;
    `}
`;

export const LoaderWrapper = styled.div`
  transform: scale(0.7);

  @media (min-width: ${breakpoints.tablet}) {
    transform: scale(1);
  }
`;
