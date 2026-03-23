import styled from 'styled-components';
import { breakpoints } from '@/styles/breakpoints';

export const SkeletonGrid = styled.div<{
  $min?: string;
  $gap?: string;
  $tabletGap?: string;
  $desktopGap?: string;
  $columns?: number;
  $tabletColumns?: number;
  $desktopColumns?: number;
  $mt?: string;
}>`
  display: grid;
  grid-template-columns: repeat(${(p) => p.$columns || 1}, 1fr);
  gap: ${(p) => p.$gap || '20px'};
  margin-top: ${(p) => p.$mt || '30px'};

  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(${(p) => p.$tabletColumns || 2}, 1fr);
    gap: ${(p) => p.$tabletGap || p.$gap || '24px'};
  }

  @media (min-width: ${breakpoints.desktop}) {
    grid-template-columns: repeat(${(p) => p.$desktopColumns || 3}, 1fr);
    gap: ${(p) => p.$desktopGap || p.$tabletGap || p.$gap || '30px'};
  }
`;
