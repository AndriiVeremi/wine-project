import { FiSearch } from 'react-icons/fi';
import { SearchBarWrapper, SearchInput, SearchButton } from './SearchBar.styled';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
  className?: string;
}

const SearchBar = ({ value, onChange, onSearch, placeholder, className }: SearchBarProps) => {
  return (
    <SearchBarWrapper className={className}>
      <SearchInput
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />

      <SearchButton onClick={onSearch} aria-label="Search">
        <FiSearch />
      </SearchButton>
    </SearchBarWrapper>
  );
};

export default SearchBar;
