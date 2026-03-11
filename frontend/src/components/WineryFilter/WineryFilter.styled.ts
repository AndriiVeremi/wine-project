import styled from 'styled-components';
import Dropdown from '../buttons/Dropdown/Dropdown';

export const StyledWineryFilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap; /* Дозволяємо перенос, якщо не влазить, щоб не ховати контент */
  gap: 16px;
  margin-bottom: 32px;
  width: 100%;
  position: relative;
  z-index: 100; /* Піднімаємо весь блок фільтрів вище за список карток */
`;

export const StyledDropDown = styled(Dropdown)<{ $isOpen?: boolean }>`
  width: 180px;
  height: 48px;
  flex-shrink: 0;
  position: relative;
  z-index: ${(props) => (props.$isOpen ? 105 : 10)};
`;
export const SearchFieldWrapper = styled.div`
  flex-grow: 1;
  min-width: 200px;
  z-index: 1; /* Пошук нижче за випадаючі списки */
`;
