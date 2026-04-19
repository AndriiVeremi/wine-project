import styled, { keyframes } from 'styled-components';

const wave = keyframes`
  0% { transform: translate(-20px, 0); }
  50% { transform: translate(-10px, -2px); }
  100% { transform: translate(-20px, 0); }
`;

interface StyledProps {
  $isFavorite: boolean;
}

export const StyledFavoriteButton = styled.button<StyledProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  position: relative;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  outline: none;

  &:hover {
    transform: scale(1.15);
  }

  &:active {
    transform: scale(0.9);
  }

  svg {
    display: block;
    overflow: visible;
  }

  .wine-fill {
    transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateY(${(props) => (props.$isFavorite ? '0' : '24px')});
  }

  .wave-effect {
    animation: ${wave} 2s infinite ease-in-out;
    opacity: ${(props) => (props.$isFavorite ? 0.6 : 0)};
    transition: opacity 0.5s;
  }

  path.heart-outline {
    fill: none;
    stroke: #841013;
    stroke-width: 1.5;
    transition: stroke-width 0.3s;
  }

  &:hover path.heart-outline {
    stroke-width: 2;
  }
`;
