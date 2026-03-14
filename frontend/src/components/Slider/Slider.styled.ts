import styled from 'styled-components';

export const SliderWrapper = styled.div`
  width: 100%;
  padding: 40px 0;
  overflow: hidden;

  .swiper-pagination-bullet-active {
    background: var(--primary-wine);
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: var(--primary-wine);

    &::after {
      font-size: 24px;
      font-weight: bold;
    }
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
  }
`;
