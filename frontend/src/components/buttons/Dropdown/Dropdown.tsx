import { useEffect, useRef } from 'react';
import { Wrapper, Button, List, Item, ArrowIcon } from './Dropdown.styled';

interface DropdownProps {
  label: string;
  value: string;
  options: string[];
  isOpen: boolean;
  onOpen: () => void;
  onSelect?: (value: string) => void;
}

const Dropdown = ({ label, value, options, isOpen, onOpen, onSelect }: DropdownProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleSelect = (val: string) => {
    onSelect?.(val);
    onOpen();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        if (isOpen) onOpen();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onOpen]);

  return (
    <Wrapper ref={ref}>
      <Button onClick={onOpen} $active={isOpen || !!value}>
        {value || label}
        <ArrowIcon $open={isOpen} size={16} />
      </Button>

      {isOpen && (
        <List>
          <Item onClick={() => handleSelect('')}>All</Item>
          {options.map((opt) => (
            <Item key={opt} onClick={() => handleSelect(opt)}>
              {opt}
            </Item>
          ))}
        </List>
      )}
    </Wrapper>
  );
};

export default Dropdown;
