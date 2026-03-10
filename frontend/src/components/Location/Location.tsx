import { useState } from 'react';
import { useLocationStore } from '@/store/location/locationStore';
import {
  List,
  Text,
  Item,
  LocationIcon,
  DropDownIcon,
  RelativeContainer,
  CountryDropdown,
  CountryItem,
} from './Location.styled';

const COUNTRIES = ['Georgia', 'Ukraine', 'France', 'Italy'];

const Location = () => {
  const { country, setCountry } = useLocationStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (c: string) => {
    setCountry(c);
    setIsOpen(false);
  };

  return (
    <RelativeContainer onClick={() => setIsOpen(!isOpen)}>
      <List>
        <Item>
          <LocationIcon />
        </Item>
        <Item>
          <Text>{country}</Text>
        </Item>
        <Item>
          <DropDownIcon />
        </Item>
      </List>

      {isOpen && (
        <CountryDropdown>
          {COUNTRIES.map((c) => (
            <CountryItem key={c} onClick={() => handleSelect(c)}>
              {c}
            </CountryItem>
          ))}
        </CountryDropdown>
      )}
    </RelativeContainer>
  );
};

export default Location;
