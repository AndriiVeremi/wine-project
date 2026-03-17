import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { PaginationButton, PaginationWrapper, PageInfo, CurrentPage } from './AppPagination.styled';

interface AppPaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const AppPagination = ({ page, totalPages, onChange }: AppPaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <PaginationWrapper>
      <PaginationButton disabled={page === 1} onClick={() => onChange(page - 1)}>
        <FiChevronLeft size={18} />
      </PaginationButton>

      <PageInfo>
        Page <CurrentPage>{page}</CurrentPage> of {totalPages}
      </PageInfo>

      <PaginationButton disabled={page === totalPages} onClick={() => onChange(page + 1)}>
        <FiChevronRight size={18} />
      </PaginationButton>
    </PaginationWrapper>
  );
};

export default AppPagination;
