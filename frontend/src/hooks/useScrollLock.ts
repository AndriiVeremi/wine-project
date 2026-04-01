import { useEffect } from 'react';

export const useScrollLock = (lock: boolean) => {
  useEffect(() => {
    if (!lock) return;

    const html = document.documentElement;
    const body = document.body;

    const originalStyleBody = window.getComputedStyle(body).overflow;
    const originalStyleHtml = window.getComputedStyle(html).overflow;
    const originalHeightBody = body.style.height;
    const originalHeightHtml = html.style.height;
    const originalPaddingRightBody = body.style.paddingRight;

    const scrollBarWidth = window.innerWidth - html.clientWidth;

    body.style.overflow = 'hidden';
    html.style.overflow = 'hidden';
    body.style.height = '100%';
    html.style.height = '100%';

    if (scrollBarWidth > 0) {
      body.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      body.style.overflow = originalStyleBody;
      html.style.overflow = originalStyleHtml;
      body.style.height = originalHeightBody;
      html.style.height = originalHeightHtml;
      body.style.paddingRight = originalPaddingRightBody;
    };
  }, [lock]);
};
