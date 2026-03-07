import styled from 'styled-components';
import { FiChevronDown } from 'react-icons/fi';

export const Wrapper = styled.div`
  position: relative;
  width: 180px;
`;

export const Button = styled.button<{ $active: boolean }>`
  width: 100%;
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid #ddd;
  background: ${({ $active }) => ($active ? '#ffe8d2' : '#fff')};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  transition: 0.2s;

  &:hover {
    background: #fff4e8;
  }
`;

export const ArrowIcon = styled(FiChevronDown)<{ $open: boolean }>`
  transition: transform 0.2s ease;
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
`;

// export const Arrow = styled.span<{ $open: boolean }>`
//   display: inline-block;
//   transition: transform 0.2s;
//   transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
// `;

export const List = styled.ul`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  width: 100%;
  background: white;
  border-radius: 12px;
  border: 1px solid #ddd;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
  list-style: none;
  z-index: 10;
`;

export const Item = styled.li`
  padding: 10px 14px;
  cursor: pointer;
  font-size: 15px;

  &:hover {
    background: #f5f5f5;
  }
`;
