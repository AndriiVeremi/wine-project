import { useEffect, useState } from 'react';
import { breakpoints } from '@/styles/breakpoints';

const parsePx = (value: string) => parseInt(value.replace('px', ''), 10);

export const useDeviceType = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const tablet = parsePx(breakpoints.tablet); // 768
  const desktop = parsePx(breakpoints.desktop); // 1280

  const isMobile = width < tablet;
  const isTablet = width >= tablet && width < desktop;
  const isDesktop = width >= desktop;

  return { isMobile, isTablet, isDesktop };
};
