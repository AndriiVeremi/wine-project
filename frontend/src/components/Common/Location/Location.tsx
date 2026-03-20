import { useState, useEffect, useRef } from 'react';
import { useLocationStore } from '@/store/location/locationStore';
import { useWineriesFiltersStore } from '@/store/wineries/wineriesFiltersStore';
import { getCountries } from '@/api/regions';
import { Text, LocationIcon, DropDownIcon, RelativeContainer } from './Location.styled';
import { List, ListItem, DropdownMenu, DropdownMenuItem } from '../ListStyles/ListStyles';

interface Country {
  _id: string;
  name: string;
}

const Location = () => {
  const { country, setCountry } = useLocationStore();
  const setFilter = useWineriesFiltersStore((s) => s.setFilter);
  const [isOpen, setIsOpen] = useState(false);
  const [countries, setCountries] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await getCountries();
        const names = res.data.map((c: Country) => (typeof c === 'string' ? c : c.name));
        setCountries(names);
      } catch (err) {
        console.error('Failed to fetch countries', err);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (e: React.MouseEvent, c: string) => {
    e.stopPropagation();
    setCountry(c);
    setFilter('country', c);
    setFilter('region', '');
    setIsOpen(false);
  };

  return (
    <RelativeContainer ref={wrapperRef} onClick={() => setIsOpen(!isOpen)}>
      <List>
        <ListItem>
          <LocationIcon />
        </ListItem>
        <ListItem>
          <Text>{country}</Text>
        </ListItem>
        <ListItem>
          <DropDownIcon $isOpen={isOpen} />
        </ListItem>
      </List>

      {isOpen && countries.length > 0 && (
        <DropdownMenu>
          {countries.map((c) => (
            <DropdownMenuItem key={c} onClick={(e) => handleSelect(e, c)} $active={c === country}>
              {c}
            </DropdownMenuItem>
          ))}
        </DropdownMenu>
      )}
    </RelativeContainer>
  );
};

export default Location;
