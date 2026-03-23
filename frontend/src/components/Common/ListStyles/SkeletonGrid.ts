import styled from 'styled-components';

export const SkeletonGrid = styled.div<{
  $min?: string;
  $gap?: string;
  $mt?: string;
}>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${(p) => p.$min || '280px'}, 1fr));
  gap: ${(p) => p.$gap || '24px'};
  margin-top: ${(p) => p.$mt || '30px'};
`;
