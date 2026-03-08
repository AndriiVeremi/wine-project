import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { SliderWrapper } from './Slider.styled';
interface SliderProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

interface HasId {
  id?: string | number;
  _id?: string | number;
}

const Slider = <T,>({ items, renderItem }: SliderProps<T>) => {
  // Перевірка: якщо items не масив, повертаємо null або порожній блок
  if (!Array.isArray(items)) {
    return null;
  }

  return (
    <SliderWrapper>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        }}
      >
        {items.map((item, index) => {
          const itemWithId = item as unknown as HasId;
          const key = itemWithId.id || itemWithId._id || index;
          return <SwiperSlide key={key}>{renderItem(item)}</SwiperSlide>;
        })}
      </Swiper>
    </SliderWrapper>
  );
};

export default Slider;
