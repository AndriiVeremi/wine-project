import { useState, useEffect } from 'react';
import { useWinesStore } from '@/store/wine/winesStore';
import { useAuthStore } from '@/store/auth/authStore';
import { FiEdit2, FiTrash2, FiPlus, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import MainButton from '@/components/buttons/MainButton';
import AddWine from '@/components/forms/AddWinesForm/AddWinesForm';
import { useDebounce } from '@/hooks/useDebounce';
import type { Wine } from '@/types/wine';
import {
  ManagerWrapper,
  Header,
  WineTable,
  Th,
  Td,
  WineImg,
  ActionBtns,
  IconButton,
  SearchInput,
  ListHeader,
  PaginationWrapper,
  PageButton,
  PageInfo,
} from './WineManager.styled';
import { SectionTitle } from '@/pages/AccountPage/AccountPage.styled';
import toast from 'react-hot-toast';

interface Props {
  wineryId?: string;
}

const WineManager = ({ wineryId }: Props) => {
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list');
  const [editingWine, setEditingWine] = useState<Wine | null>(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearch = useDebounce(search, 500);

  const { wines, fetch, remove, loading, totalPages, total } = useWinesStore();
  const { user } = useAuthStore();

  const limit = 10;

  useEffect(() => {
    if (user?.uid) {
      fetch({
        limit,
        page: currentPage,
        wineryId,
        name: debouncedSearch,
      });
    }
  }, [user?.uid, currentPage, wineryId, debouncedSearch, fetch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, wineryId]);

  const onEdit = (wine: Wine) => {
    setEditingWine(wine);
    setView('edit');
  };

  const onRemove = async (id: string) => {
    if (window.confirm('Delete this wine?')) {
      try {
        await remove(id);
        toast.success('Removed');
        if (wines.length === 1 && currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
        } else {
          fetch({ limit, page: currentPage, wineryId, name: debouncedSearch });
        }
      } catch {
        toast.error('Failed');
      }
    }
  };

  const data = Array.isArray(wines) ? wines : [];

  if (view !== 'list') {
    return (
      <ManagerWrapper>
        <Header>
          <SectionTitle>{view === 'add' ? 'Add New Wine' : 'Edit Wine'}</SectionTitle>
          <MainButton type="button" onClick={() => setView('list')}>
            BACK
          </MainButton>
        </Header>
        <AddWine
          wineryId={wineryId}
          wineData={editingWine}
          onSuccess={() => {
            setView('list');
            fetch({ limit, page: currentPage, wineryId, name: debouncedSearch });
          }}
        />
      </ManagerWrapper>
    );
  }

  return (
    <ManagerWrapper>
      <Header>
        <SectionTitle>My Wines ({total})</SectionTitle>
        <ListHeader>
          <SearchInput
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <MainButton
            type="button"
            onClick={() => {
              setEditingWine(null);
              setView('add');
            }}
          >
            <FiPlus style={{ marginRight: '8px' }} /> ADD
          </MainButton>
        </ListHeader>
      </Header>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <WineTable>
            <thead>
              <tr>
                <Th>Photo</Th>
                <Th>Name</Th>
                <Th>Year</Th>
                <Th>Price</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {data.map((wine) => (
                <tr key={wine._id}>
                  <Td>
                    <WineImg src={wine.imageUrl || '/assets/wine-placeholder.png'} />
                  </Td>
                  <Td>{wine.name || 'Untitled'}</Td>
                  <Td>{wine.vintage || 'N/A'}</Td>
                  <Td>${wine.price || 0}</Td>
                  <Td>
                    <ActionBtns>
                      <IconButton onClick={() => onEdit(wine)} $type="edit">
                        <FiEdit2 />
                      </IconButton>
                      <IconButton onClick={() => onRemove(wine._id)} $type="delete">
                        <FiTrash2 />
                      </IconButton>
                    </ActionBtns>
                  </Td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <Td colSpan={5} style={{ textAlign: 'center', color: '#999' }}>
                    No items found
                  </Td>
                </tr>
              )}
            </tbody>
          </WineTable>

          {totalPages > 1 && (
            <PaginationWrapper>
              <PageButton
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                <FiChevronLeft />
              </PageButton>

              <PageInfo>
                Page {currentPage} of {totalPages}
              </PageInfo>

              <PageButton
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                <FiChevronRight />
              </PageButton>
            </PaginationWrapper>
          )}
        </>
      )}
    </ManagerWrapper>
  );
};

export default WineManager;
