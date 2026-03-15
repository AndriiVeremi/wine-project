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
}

interface HasId {
  id?: string | number;
  _id?: string | number;
}

const Slider = <T,>({ items, renderItem }: SliderProps<T>) => {
  if (!Array.isArray(items)) {
    return null;
  }

  return (
    <SliderWrapper>
      <NavButton className="prev-btn">
        <FaChevronLeft size={24} />
      </NavButton>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation={{
          nextEl: '.next-btn',
          prevEl: '.prev-btn',
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        breakpoints={{
          768: { slidesPerView: 2, spaceBetween: 20 },
          1280: { slidesPerView: 4, spaceBetween: 30 },
        }}
      >
        {items.map((item, index) => {
          const itemWithId = item as unknown as HasId;
          const key = itemWithId.id || itemWithId._id || index;
          return <SwiperSlide key={key}>{renderItem(item)}</SwiperSlide>;
        })}
      </Swiper>

      <NavButton className="next-btn">
        <FaChevronRight size={24} />
      </NavButton>
    </SliderWrapper>
  );
};

export default Slider;
