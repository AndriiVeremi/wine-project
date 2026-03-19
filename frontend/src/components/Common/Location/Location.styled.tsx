import styled from 'styled-components';
import { CiLocationOn } from 'react-icons/ci';
import { IoChevronDownSharp } from 'react-icons/io5';
import '@/styles/vars.css';

export const Text = styled('p')`
  font-family: var(--font-main);
  color: var(--font-grey);
  font-size: 17px;
  font-weight: 500;
  font-style: medium;
  line-height: 26px;
`;

export const LocationIcon = styled(CiLocationOn)`
  color: var(--brown-icon);
  width: 22px;
  height: 30px;
  margin-right: 2px;
  stroke-width: 0.6px;
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
