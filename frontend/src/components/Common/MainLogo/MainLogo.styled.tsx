import styled from 'styled-components';
export const Logo = styled('img')`
  width: 160px;
  height: 60px;
  object-fit: contain;
  cursor: pointer;
  @media (max-width: 767px) {
    width: 120px;
    height: 45px;
  }
`;
