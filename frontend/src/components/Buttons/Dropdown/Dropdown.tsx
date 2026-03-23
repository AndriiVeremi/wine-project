import { useEffect, useRef } from 'react';
import { Wrapper, Button, List, Item, ArrowIcon, ScrollWrapper } from './Dropdown.styled';

interface DropdownProps {
  label: string;
  value: string;
  options: string[];
  isOpen: boolean;
  className?: string;
  disabled?: boolean;
  onOpen: () => void;
  onSelect?: (value: string) => void;
}

const Dropdown = ({
  label,
  value,
  options,
  isOpen,
  className,
  disabled,
  onOpen,
  onSelect,
}: DropdownProps) => {
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
    <Wrapper ref={ref} className={className} $disabled={disabled}>
      <Button
        onClick={disabled ? undefined : onOpen}
        $active={isOpen || !!value}
        $disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Select ${label}`}
      >
        <span className="dropdown-label">{value || label}</span>
        <ArrowIcon $open={isOpen} />
      </Button>

      {isOpen && (
        <List role="listbox">
          <ScrollWrapper>
            <Item onClick={() => handleSelect('')} role="option" aria-selected={!value}>
              All
            </Item>
            {options.map((opt) => (
              <Item
                key={opt}
                onClick={() => handleSelect(opt)}
                role="option"
                aria-selected={value === opt}
              >
                {opt}
              </Item>
            ))}
          </ScrollWrapper>
        </List>
      )}
    </Wrapper>
  );
};

export default Dropdown;
