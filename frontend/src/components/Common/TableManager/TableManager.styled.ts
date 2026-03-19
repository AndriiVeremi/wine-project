import styled from 'styled-components';
import { breakpoints } from '@/styles/breakpoints';

export const ManagerWrapper = styled.div`
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 20px;

  @media (max-width: ${breakpoints.desktop}) {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }
`;

export const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  width: 100%;

  @media (max-width: ${breakpoints.desktop}) {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;

  @media (max-width: ${breakpoints.desktop}) {
    width: 100%;

    & > input {
      flex: 1;
    }
  }
`;

export const SearchInput = styled.input`
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  width: 280px;
  outline: none;
  font-family: inherit;
  font-size: 14px;
  transition: all 0.2s;

  &:focus {
    border-color: #841013;
    box-shadow: 0 0 0 3px rgba(132, 16, 19, 0.1);
  }

  @media (max-width: ${breakpoints.desktop}) {
    width: 100%;
  }
`;

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  border: 1px solid #f1f5f9;
`;

export const CustomTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
`;

export const Th = styled.th`
  text-align: left;
  padding: 18px 24px;
  background: #ffeacb;
  color: #64748b;
  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #f1f5f9;
`;

export const Td = styled.td`
  padding: 18px 24px;
  vertical-align: middle;
  color: #334155;
  font-size: 15px;
  border-bottom: 1px solid #ffeacb;
`;

export const ItemImg = styled.img`
  width: 52px;
  height: 52px;
  object-fit: contain;
  border-radius: 10px;
  background: #ffeacb;
  border: 1px solid #e2e8f0;
  padding: 4px;
`;

export const ActionBtns = styled.div`
  display: flex;
  gap: 10px;
`;

export const IconButton = styled.button<{ $type?: 'edit' | 'delete' }>`
  background: #ffeacb;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  color: ${({ $type }) => ($type === 'delete' ? '#ef4444' : '#3b82f6')};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    background: ${({ $type }) => ($type === 'delete' ? '#fee2e2' : '#dbeafe')};
    border-color: transparent;
    transform: scale(1.05);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const Row = styled.tr`
  transition: background 0.2s;
  &:hover {
    background: #ffeacb;
  }
`;

export const PageInfo = styled.span`
  font-size: 14px;
  color: #64748b;
  font-weight: 600;
`;

export const EmptyStateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  text-align: center;
  width: 100%;
  border: 1px solid #f1f5f9;
`;

export const EmptyIconBox = styled.div`
  font-size: 72px;
  color: #cbd5e1;
  margin-bottom: 24px;
`;

export const EmptyTitle = styled.h3`
  font-size: 22px;
  color: #1e293b;
  margin-bottom: 12px;
  font-weight: 700;
`;

export const EmptyText = styled.p`
  font-size: 16px;
  color: #94a3b8;
  max-width: 320px;
  line-height: 1.6;
  margin-bottom: 24px;
`;
