import { useEffect } from 'react';

export function useLockBodyScroll(freezeBodyScroll: boolean) {
  useEffect(() => {
    const paddingRight = document.documentElement.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    if (freezeBodyScroll) {
      document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
      window.document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.removeProperty('overflow');
    }
    return () => {
      document.documentElement.style.paddingRight = paddingRight;
    };
  }, [freezeBodyScroll]);
}
