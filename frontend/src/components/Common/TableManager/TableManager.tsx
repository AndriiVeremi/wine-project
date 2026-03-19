import React from 'react';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import MainButton from '@/components/Buttons/MainButton';
import AppPagination from '@/components/Common/AppPagination/AppPagination';
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
  Row,
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
              placeholder="Search items..."
              value={search}
              onChange={(e) => onSearch(e.target.value)}
            />
            {extraHeaderContent}
          </div>
          {onAdd && (
            <MainButton type="button" onClick={onAdd}>
              <FiPlus /> ADD NEW
            </MainButton>
          )}
        </ListHeader>
      </Header>

      {loading ? (
        <p style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading records...</p>
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
                  <Th style={{ textAlign: 'right' }}>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <Row key={getId(item)}>
                    {columns.map((col, i) => (
                      <Td key={i}>{col.render(item)}</Td>
                    ))}
                    <Td>
                      <ActionBtns style={{ justifyContent: 'flex-end' }}>
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
                  </Row>
                ))}
                {data.length === 0 && (
                  <tr>
                    <Td
                      colSpan={columns.length + 1}
                      style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}
                    >
                      No results found for your search.
                    </Td>
                  </tr>
                )}
              </tbody>
            </CustomTable>
          </TableContainer>

          <div style={{ marginTop: '24px' }}>
            <AppPagination page={page} totalPages={totalPages} onChange={onPage} />
          </div>
        </>
      )}
    </ManagerWrapper>
  );
}

export default TableManager;
