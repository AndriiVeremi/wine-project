import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFiltersStore } from '@/store/wine/filtersStore';
import {
  ImageList,
  WineImage,
  WineImageItem,
} from '@/components/WineColorFilters/WineColorFilters.styled';

import img1 from '@/assets/wine1_red.png';
import img2 from '@/assets/wine2_orange.png';
import img3 from '@/assets/wine3_rose.png';
import img4 from '@/assets/wine4_white.png';

const WineColorFilters: React.FC = () => {
  const navigate = useNavigate();
  const setFilter = useFiltersStore((s) => s.setFilter);
  const clearFilters = useFiltersStore((s) => s.clearFilters);

  const onWineClick = (color: string) => {
    clearFilters();
    setFilter('color', color);
    navigate('/wines');
  };

  return (
    <ImageList>
      <WineImageItem onClick={() => onWineClick('Red')}>
        <WineImage src={img1} alt="red wine" />
      </WineImageItem>
      <WineImageItem onClick={() => onWineClick('Orange')}>
        <WineImage src={img2} alt="orange wine" />
      </WineImageItem>
      <WineImageItem onClick={() => onWineClick('Rose')}>
        <WineImage src={img3} alt="rose wine" />
      </WineImageItem>
      <WineImageItem onClick={() => onWineClick('White')}>
        <WineImage src={img4} alt="white wine" />
      </WineImageItem>
    </ImageList>
  );
};

export default WineColorFilters;
