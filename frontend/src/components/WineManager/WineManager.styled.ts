import styled from 'styled-components';

export const ManagerWrapper = styled.div`
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

export const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

export const SearchInput = styled.input`
  padding: 10px 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  width: 250px;
  outline: none;

  &:focus {
    border-color: var(--accent-color, #841013);
  }
`;

export const WineTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

export const Th = styled.th`
  text-align: left;
  padding: 15px;
  background: #f8f8f8;
  color: #666;
  font-weight: 600;
  font-size: 14px;
`;

export const Td = styled.td`
  padding: 15px;
  border-top: 1px solid #eee;
  vertical-align: middle;
`;

export const WineImg = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 4px;
  background: #fdfdfd;
`;

export const ActionBtns = styled.div`
  display: flex;
  gap: 10px;
`;

export const IconButton = styled.button<{ $type?: 'edit' | 'delete' }>`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ $type }) => ($type === 'delete' ? '#e44848' : '#4a90e2')};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 4px;
  transition: background 0.2s;

  &:hover {
    background: #f0f0f0;
  }
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 30px;
`;

export const PageButton = styled.button<{ $active?: boolean }>`
  background: ${({ $active }) => ($active ? 'var(--accent-color, #841013)' : 'white')};
  color: ${({ $active }) => ($active ? 'white' : 'var(--text-color, #333)')};
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    border-color: var(--accent-color, #841013);
    color: ${({ $active }) => ($active ? 'white' : 'var(--accent-color, #841013)')};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const PageInfo = styled.span`
  font-size: 14px;
  color: #666;
`;
