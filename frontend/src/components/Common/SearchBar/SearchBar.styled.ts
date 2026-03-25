import styled from 'styled-components';
import { breakpoints } from '@/styles/breakpoints';

export const SearchBarWrapper = styled.div`
  width: 100%;
  position: relative;
  background: var(--filter-active-bg);
  padding: 14px 20px;
  border-radius: 28px;
  border: 1px solid var(--filter-border-color);

  @media (min-width: ${breakpoints.tablet}) {
    padding: 16px 22px;
    border-radius: 30px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    padding: 14px 20px;
    border-radius: 26px;
    max-width: 100%;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  font-size: 16px;
  font-family: var(--font-main);
  color: var(--primary-gray);

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
  top: 0;
  right: 0;
  height: 100%;
  width: 60px;
  border-radius: 28px;
  border: 1px solid var(--primary-wine);
  background: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  color: var(--primary-wine);
  transition:
    transform var(--transition),
    background var(--transition);

  svg {
    width: 22px;
    height: 22px;
  }

  &:hover {
    background: var(--primary-wine);
    color: var(--white);
  }

  @media (min-width: ${breakpoints.tablet}) {
    width: 70px;
    border-radius: 30px;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  @media (min-width: ${breakpoints.desktop}) {
    width: 56px;
    border-radius: 26px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;
