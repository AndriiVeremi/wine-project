import React from 'react';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import MainButton from '@/components/buttons/MainButton';
import AppPagination from '@/components/common/AppPagination/AppPagination';
import EmptyState from './EmptyState';
import {
  ManagerWrapper,
  Header,
  TableContainer,
  CustomTable,
  Th,
  Td,
  ActionBtns,
  IconButton,
  SearchInput,
  ListHeader,
} from './TableManager.styled';
import { SectionTitle } from '@/pages/AccountPage/AccountPage.styled';

export interface Column<T> {
  header: string;
  render: (item: T) => React.ReactNode;
}

interface Props<T> {
  title: string;
  data: T[];
  columns: Column<T>[];
  loading: boolean;
  total: number;
  totalPages: number;
  page: number;
  search: string;
  onSearch: (val: string) => void;
  onPage: (page: number) => void;
  onAdd?: () => void;
  onEdit?: (item: T) => void;
  onRemove: (id: string) => void;
  getId: (item: T) => string;
  emptyIcon?: React.ReactNode;
  emptyTitle?: string;
  emptyText?: string;
  extraHeaderContent?: React.ReactNode;
}

function TableManager<T>({
  title,
  data,
  columns,
  loading,
  total,
  totalPages,
  page,
  search,
  onSearch,
  onPage,
  onAdd,
  onEdit,
  onRemove,
  getId,
  emptyIcon,
  emptyTitle = 'No data',
  emptyText = 'Click add button to start.',
  extraHeaderContent,
}: Props<T>) {
  return (
    <ManagerWrapper>
      <Header>
        <SectionTitle>
          {title} ({total})
        </SectionTitle>
        <ListHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
            <SearchInput
              placeholder="Search..."
              value={search}
              onChange={(e) => onSearch(e.target.value)}
            />
            {extraHeaderContent}
          </div>
          {onAdd && (
            <MainButton type="button" onClick={onAdd}>
              <FiPlus /> ADD
            </MainButton>
          )}
        </ListHeader>
      </Header>

      {loading ? (
        <p>Loading...</p>
      ) : total === 0 && !search ? (
        <EmptyState icon={emptyIcon} title={emptyTitle} text={emptyText} onAction={onAdd} />
      ) : (
        <>
          <TableContainer>
            <CustomTable>
              <thead>
                <tr>
                  {columns.map((col, i) => (
                    <Th key={i}>{col.header}</Th>
                  ))}
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={getId(item)}>
                    {columns.map((col, i) => (
                      <Td key={i}>{col.render(item)}</Td>
                    ))}
                    <Td>
                      <ActionBtns>
                        {onEdit && (
                          <IconButton onClick={() => onEdit(item)} $type="edit">
                            <FiEdit2 />
                          </IconButton>
                        )}
                        <IconButton onClick={() => onRemove(getId(item))} $type="delete">
                          <FiTrash2 />
                        </IconButton>
                      </ActionBtns>
                    </Td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <Td colSpan={columns.length + 1} style={{ textAlign: 'center', color: '#999' }}>
                      Not found
                    </Td>
                  </tr>
                )}
              </tbody>
            </CustomTable>
          </TableContainer>

          <AppPagination page={page} totalPages={totalPages} onChange={onPage} />
        </>
      )}
    </ManagerWrapper>
  );
}

export default TableManager;
