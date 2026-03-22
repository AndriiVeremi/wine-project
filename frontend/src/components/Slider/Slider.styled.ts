import styled from 'styled-components';

export const SliderWrapper = styled.div`
  width: 100%;
  padding: 40px 0;
  position: relative;
  display: flex;
  align-items: center;
  gap: 20px;

  .swiper {
    width: 100%;
    padding-top: 15px;
    padding-bottom: 40px;
    margin-top: -15px;
    contain: layout style;
    transform: translateZ(0);
  }

  .swiper-pagination {
    bottom: 0 !important;
  }

  .swiper-pagination-bullet-active {
    background: var(--primary-wine);
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
  }
`;

export const NavButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--primary-wine);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: opacity 0.3s;
  flex-shrink: 0;

  &:hover {
    opacity: 0.7;
  }

  &.swiper-button-disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;
