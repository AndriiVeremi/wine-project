import styled from 'styled-components';
import { breakpoints } from '@/styles/breakpoints';

export const SearchBarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: var(--footer-cream);
  padding: 16px;
  border-radius: 24px;
  border: 1px solid rgba(132, 16, 19, 0.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
    align-items: center;
    padding: 10px 10px 10px 24px;
    gap: 16px;
    border-radius: 40px;
  }
`;

export const InputWrapper = styled.div`
  width: 100%;
  position: relative;
  background: var(--white);
  padding: 8px 14px;
  border-radius: 30px;
  border: 1px solid var(--filter-border-color);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  flex: 1;

  &:hover,
  &:focus-within {
    border-color: var(--primary-wine);
    box-shadow: 0 4px 12px rgba(132, 16, 19, 0.08);
  }

  @media (min-width: ${breakpoints.tablet}) {
    padding: 10px 16px;
    border-radius: 32px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    padding: 8px 12px;
    border-radius: 30px;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  font-size: 16px;
  font-family: var(--font-main);
  color: var(--black-color);
  padding-right: 50px;
  background: transparent;
  border: none;
  outline: none;

  &::placeholder {
    color: var(--secondary-gray);
    opacity: 0.6;
  }

  @media (min-width: ${breakpoints.desktop}) {
    font-size: 15px;
  }
`;

export const SearchButton = styled.button`
  position: absolute;
  top: 50%;
  right: 6px;
  transform: translateY(-50%);
  height: calc(100% - 12px);
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  border: none;
  background: var(--primary-wine);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  transition: all 0.3s ease;

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    background: var(--primary-wine-hover, #a1161a);
    transform: translateY(-50%) scale(1.05);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }

  @media (min-width: ${breakpoints.tablet}) {
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;
