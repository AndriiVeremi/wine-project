import { memo } from 'react';
import type { Region } from '@/types/region';

interface RegionPathProps {
  region: Region;
  pathData: string;
  isHovered: boolean;
  onMouseEnter: (regionId: string) => void;
  onMouseLeave: () => void;
  onClick: (regionId: string) => void;
}

const RegionPath = ({
  region,
  pathData,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: RegionPathProps) => (
  <path
    key={region._id}
    d={pathData}
    className="region-interactive-path"
    onMouseEnter={() => onMouseEnter(region.name)}
    onMouseLeave={onMouseLeave}
    onClick={() => onClick(region._id)}
    style={{
      fill: isHovered ? 'var(--primary-wine)' : 'transparent',
      cursor: 'pointer',
      transition: 'fill 0.3s ease',
    }}
  />
);

export default memo(RegionPath);
