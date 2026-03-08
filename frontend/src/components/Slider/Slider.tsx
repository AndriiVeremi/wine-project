import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { SliderWrapper } from './Slider.styled';

interface SliderProps<T> {
  items: T[]; // Масив даних (вина, виноробні тощо)
  renderItem: (item: T) => React.ReactNode; // Функція, як малювати один елемент
}

const Slider = <T extends { id?: string; _id?: string }>({ items, renderItem }: SliderProps<T>) => {
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
        {items.map((item, index) => (
          <SwiperSlide key={item.id || item._id || index}>{renderItem(item)}</SwiperSlide>
        ))}
      </Swiper>
    </SliderWrapper>
  );
};

export default Slider;
