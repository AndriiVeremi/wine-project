import { useState } from 'react';
import Dropdown from '../buttons/Dropdown/Dropdown';
import { StyledWineFilterContainer } from './WineFilter.styled';

const WineFilter = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <StyledWineFilterContainer>
      <Dropdown
        label="Color"
        options={['Red', 'White', 'Rosé']}
        isOpen={openDropdown === 'color'}
        onOpen={() => setOpenDropdown(openDropdown === 'color' ? null : 'color')}
      />

      <Dropdown
        label="Region"
        options={['Georgia', 'France', 'Italy']}
        isOpen={openDropdown === 'region'}
        onOpen={() => setOpenDropdown(openDropdown === 'region' ? null : 'region')}
      />

      <Dropdown
        label="Grape"
        options={['Saperavi', 'Rkatsiteli', 'Cabernet']}
        isOpen={openDropdown === 'grape'}
        onOpen={() => setOpenDropdown(openDropdown === 'grape' ? null : 'grape')}
      />
    </StyledWineFilterContainer>
  );
};

export default WineFilter;
