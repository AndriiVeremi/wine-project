import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { SliderWrapper, NavButton } from './Slider.styled';

interface SliderProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  isLoading?: boolean;
  renderSkeleton?: () => React.ReactNode;
}

interface HasId {
  id?: string | number;
  _id?: string | number;
}

const Slider = <T,>({ items, renderItem, isLoading, renderSkeleton }: SliderProps<T>) => {
  const showSkeleton = isLoading && renderSkeleton;
  const hasItems = Array.isArray(items) && items.length > 0;

  if (!showSkeleton && !hasItems) {
    return null;
  }

  return (
    <SliderWrapper>
      <NavButton
        className="prev-btn"
        aria-label="Previous slide"
        style={{ visibility: showSkeleton ? 'hidden' : 'visible' }}
      >
        <FaChevronLeft size={24} />
      </NavButton>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        observer={true}
        observeParents={true}
        watchSlidesProgress={true}
        navigation={{
          nextEl: '.next-btn',
          prevEl: '.prev-btn',
        }}
        pagination={{ clickable: true }}
        autoplay={showSkeleton ? false : { delay: 5000, disableOnInteraction: false }}
        breakpoints={{
          768: { slidesPerView: 2, spaceBetween: 20 },
          1280: { slidesPerView: 4, spaceBetween: 30 },
        }}
      >
        {showSkeleton
          ? Array.from({ length: 4 }).map((_, idx) => (
              <SwiperSlide key={`skeleton-${idx}`}>{renderSkeleton()}</SwiperSlide>
            ))
          : items.map((item, index) => {
              const itemWithId = item as unknown as HasId;
              const key = itemWithId.id || itemWithId._id || index;
              return <SwiperSlide key={key}>{renderItem(item)}</SwiperSlide>;
            })}
      </Swiper>

      <NavButton
        className="next-btn"
        aria-label="Next slide"
        style={{ visibility: showSkeleton ? 'hidden' : 'visible' }}
      >
        <FaChevronRight size={24} />
      </NavButton>
    </SliderWrapper>
  );
};

export default Slider;
