import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFiltersStore } from '@/store/wine/filtersStore';
import {
  FilterGrid,
  FilterCard,
  CardImage,
  CardTitle,
} from '@/components/Wine/WineColorFilters/WineColorFilters.styled';

import img1 from '@/assets/wine-filters/wine1_red.webp';
import img1Mobile from '@/assets/wine-filters/wine1_red-mobile.webp';
import img2 from '@/assets/wine-filters/wine2_orange.webp';
import img2Mobile from '@/assets/wine-filters/wine2_orange-mobile.webp';
import img3 from '@/assets/wine-filters/wine3_rose.webp';
import img3Mobile from '@/assets/wine-filters/wine3_rose-mobile.webp';
import img4 from '@/assets/wine-filters/wine4_white.webp';
import img4Mobile from '@/assets/wine-filters/wine4_white-mobile.webp';

const WineColorFilters: React.FC = () => {
  const navigate = useNavigate();
  const setFilter = useFiltersStore((s) => s.setFilter);
  const clearFilters = useFiltersStore((s) => s.clearFilters);

  const onWineClick = (color: string) => {
    clearFilters();
    setFilter('color', color);
    navigate('/wines');
  };

  const wineColors = [
    { name: 'Red', label: 'Bold Reds', img: img1, imgMobile: img1Mobile },
    { name: 'Orange', label: 'Unique Oranges', img: img2, imgMobile: img2Mobile },
    { name: 'Rose', label: 'Fresh Roses', img: img3, imgMobile: img3Mobile },
    { name: 'White', label: 'Classic Whites', img: img4, imgMobile: img4Mobile },
  ];

  return (
    <FilterGrid>
      {wineColors.map((color) => (
        <FilterCard
          key={color.name}
          onClick={() => onWineClick(color.name)}
          aria-label={`Filter wines by ${color.name} color`}
          type="button"
        >
          <CardImage
            src={color.img}
            srcSet={`${color.imgMobile} 480w, ${color.img} 768w`}
            sizes="(max-width: 480px) 150px, (max-width: 768px) 200px, 245px"
            alt={`${color.name} wine`}
            width="245"
            height="293"
            loading="lazy"
          />
          <CardTitle>{color.label}</CardTitle>
        </FilterCard>
      ))}
    </FilterGrid>
  );
};

export default WineColorFilters;
