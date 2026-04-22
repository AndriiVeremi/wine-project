import { FiSearch } from 'react-icons/fi';
import { SearchBarContainer, InputWrapper, SearchInput, SearchButton } from './SearchBar.styled';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
  className?: string;
  children?: React.ReactNode;
}

const SearchBar = ({
  value,
  onChange,
  onSearch,
  placeholder,
  className,
  children,
}: SearchBarProps) => {
  return (
    <SearchBarContainer className={className}>
      <InputWrapper>
        <SearchInput
          type="search"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />

        <SearchButton onClick={onSearch} aria-label="Search">
          <FiSearch />
        </SearchButton>
      </InputWrapper>
      {children}
    </SearchBarContainer>
  );
};

export default SearchBar;
