import styled from 'styled-components';
import { breakpoints } from '@/styles/breakpoints';

export const FilterSection = styled.section`
  padding: 40px 0;
`;

export const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  width: 100%;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    gap: 30px;
  }
`;

export const FilterCard = styled.button`
  position: relative;
  cursor: pointer;
  background: transparent;
  border: none;
  transition: var(--transition);
  aspect-ratio: 1 / 1.3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 100%;

  @media (min-width: 375px) {
    padding: 15px;
  }

  @media (min-width: ${breakpoints.tablet}) {
    padding: 20px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    padding: 5px;
    aspect-ratio: 1 / 1.5;
  }

  &:hover {
    transform: translateY(-5px);
  }

  &.active {
    background: var(--filter-active-bg);
    border-radius: var(--border-radius-lg);
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 75%;
  object-fit: contain;
  transition: transform 0.4s ease;

  @media (min-width: ${breakpoints.desktop}) {
    max-height: 65%;
  }

  ${FilterCard}:hover & {
    transform: scale(1.08);
  }
`;

export const CardTitle = styled.h3`
  margin-top: 8px;
  font-family: var(--font-accent);
  font-size: 14px;
  font-weight: 600;
  color: var(--primary-wine);
  text-transform: capitalize;
  text-align: center;
  width: 100%;
  line-height: 1.2;

  @media (min-width: 360px) {
    font-size: 16px;
  }

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 18px;
    margin-top: 12px;
  }

  @media (min-width: 1024px) {
    font-size: 20px;
    margin-top: 15px;
  }
`;
