import { useState, useEffect } from 'react';
import { useLocationStore } from '@/store/location/locationStore';
import { useWineriesFiltersStore } from '@/store/wineries/wineriesFiltersStore';
import { getCountries } from '@/api/regions';
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

interface Country {
  _id: string;
  name: string;
}

const Location = () => {
  const { country, setCountry } = useLocationStore();
  const setFilter = useWineriesFiltersStore((s) => s.setFilter);
  const [isOpen, setIsOpen] = useState(false);
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await getCountries();
        // Витягуємо тільки імена країн, якщо прийшли об'єкти
        const names = res.data.map((c: Country) => (typeof c === 'string' ? c : c.name));
        setCountries(names);
      } catch (err) {
        console.error('Failed to fetch countries', err);
      }
    };
    fetchCountries();
  }, []);

  const handleSelect = (e: React.MouseEvent, c: string) => {
    e.stopPropagation();
    setCountry(c);
    setFilter('country', c);
    setFilter('region', '');
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

      {isOpen && countries.length > 0 && (
        <CountryDropdown>
          {countries.map((c) => (
            <CountryItem key={c} onClick={(e) => handleSelect(e, c)}>
              {c}
            </CountryItem>
          ))}
        </CountryDropdown>
      )}
    </RelativeContainer>
  );
};

export default Location;
