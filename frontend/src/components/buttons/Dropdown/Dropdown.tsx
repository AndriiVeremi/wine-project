import { useEffect, useRef, useState } from 'react';
import { Wrapper, Button, List, Item, ArrowIcon } from './Dropdown.styled';

interface DropdownProps {
  label: string;
  options: string[];
  isOpen: boolean;
  onOpen: () => void;
  onSelect?: (value: string) => void;
}

const Dropdown = ({ label, options, isOpen, onOpen, onSelect }: DropdownProps) => {
  const [selected, setSelected] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  const handleSelect = (value: string) => {
    setSelected(value);
    onSelect?.(value);
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
      <Button onClick={onOpen} $active={isOpen || !!selected}>
        {selected || label}
        <ArrowIcon $open={isOpen} size={18} />
      </Button>

      {isOpen && (
        <List>
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
