import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { PaginationButton, PaginationPageButton, PaginationWrapper } from './AppPagination.styled';

interface AppPaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const AppPagination = ({ page, totalPages, onChange }: AppPaginationProps) => {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <PaginationWrapper>
      <PaginationButton disabled={page === 1} onClick={() => onChange(page - 1)}>
        <FaChevronLeft size={16} color="var(--primary-gray)" />
        Prev
      </PaginationButton>
      {pages.map((p) => (
        <PaginationPageButton key={p} $active={p === page} onClick={() => onChange(p)}>
          {p}
        </PaginationPageButton>
      ))}
      <PaginationButton disabled={page === totalPages} onClick={() => onChange(page + 1)}>
        Next
        <FaChevronRight size={16} color="var(--primary-gray)" />
      </PaginationButton>
    </PaginationWrapper>
  );
};

export default AppPagination;
