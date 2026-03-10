import styled from 'styled-components';
import { CiLocationOn } from 'react-icons/ci';
import { IoChevronDownSharp } from 'react-icons/io5';
import '@/styles/vars.css';

export const List = styled('ul')`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Text = styled('p')`
  font-family: var(--font-main);
  color: var(--font-grey);
  font-size: 17px;
  font-weight: 500;
  font-style: medium;
  line-height: 26px;
`;

export const Item = styled('li')`
  display: flex;
  align-items: center;
`;

export const LocationIcon = styled(CiLocationOn)`
  color: var(--brown-icon);
  width: 20px;
  height: 28px;
  margin-right: 2px;
  stroke-width: 1px;
`;

export const DropDownIcon = styled(IoChevronDownSharp)`
  color: var(--font-grey);
  width: 20px;
  height: 20px;
`;

export const RelativeContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

export const CountryDropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  list-style: none;
  padding: 8px 0;
  margin-top: 8px;
  width: 150px;
  box-shadow: var(--main-shadow);
  z-index: 100;
`;

export const CountryItem = styled.li`
  padding: 8px 16px;
  font-family: var(--font-main);
  color: var(--font-grey);
  transition: background 0.2s;

  &:hover {
    background: var(--tertiary-gray);
  }
`;
