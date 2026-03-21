import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFiltersStore } from '@/store/wine/filtersStore';
import {
  FilterGrid,
  FilterCard,
  CardImage,
  CardTitle,
} from '@/components/Wine/WineColorFilters/WineColorFilters.styled';

import img1 from '@/assets/wine1_red.webp';
import img2 from '@/assets/wine2_orange.webp';
import img3 from '@/assets/wine3_rose.webp';
import img4 from '@/assets/wine4_white.webp';

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
    { name: 'Red', label: 'Bold Reds', img: img1 },
    { name: 'Orange', label: 'Unique Oranges', img: img2 },
    { name: 'Rose', label: 'Fresh Roses', img: img3 },
    { name: 'White', label: 'Classic Whites', img: img4 },
  ];

  return (
    <FilterGrid>
      {wineColors.map((color) => (
        <FilterCard key={color.name} onClick={() => onWineClick(color.name)}>
          <CardImage src={color.img} alt={`${color.name} wine`} />
          <CardTitle>{color.label}</CardTitle>
        </FilterCard>
      ))}
    </FilterGrid>
  );
};

export default WineColorFilters;
