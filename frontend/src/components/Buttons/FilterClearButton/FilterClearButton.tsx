import { StyledFilterClearButton } from './FilterClearButton.styled';

interface Props {
  onClick: () => void;
  children: React.ReactNode;
}

const FilterClearButton = ({ onClick, children }: Props) => {
  return <StyledFilterClearButton onClick={onClick}>{children}</StyledFilterClearButton>;
};

export default FilterClearButton;
