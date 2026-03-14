import styled from 'styled-components';

export const ManagerWrapper = styled.div`
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
`;

export const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SearchInput = styled.input`
  padding: 10px 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  width: 250px;
  outline: none;
  font-family: var(--font-main);

  &:focus {
    border-color: var(--accent-color, #841013);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

export const CustomTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  text-align: left;
  padding: 15px;
  background: #f8f8f8;
  color: #666;
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap;
`;

export const Td = styled.td`
  padding: 15px;
  border-top: 1px solid #eee;
  vertical-align: middle;
  color: #333;
`;

export const ItemImg = styled.img`
  width: 45px;
  height: 45px;
  object-fit: contain;
  border-radius: 6px;
  background: #fdfdfd;
  border: 1px solid #f0f0f0;
`;

export const ActionBtns = styled.div`
  display: flex;
  gap: 8px;
`;

export const IconButton = styled.button<{ $type?: 'edit' | 'delete' }>`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ $type }) => ($type === 'delete' ? '#e44848' : '#4a90e2')};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    background: ${({ $type }) => ($type === 'delete' ? '#fff5f5' : '#f0f7ff')};
    transform: translateY(-1px);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const PageInfo = styled.span`
  font-size: 14px;
  color: #666;
  font-weight: 500;
`;

export const EmptyStateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  text-align: center;
  width: 100%;
`;

export const EmptyIconBox = styled.div`
  font-size: 64px;
  color: #ddd;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EmptyTitle = styled.h3`
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
  font-weight: 600;
`;

export const EmptyText = styled.p`
  font-size: 15px;
  color: #888;
  max-width: 300px;
  line-height: 1.5;
`;
