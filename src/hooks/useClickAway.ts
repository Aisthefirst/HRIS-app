import { useEffect, useRef } from 'react';

export function useClickAway<T extends HTMLElement = HTMLElement>(
  handler: () => void
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickAway = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickAway);
    return () => {
      document.removeEventListener('mousedown', handleClickAway);
    };
  }, [handler]);

  return ref;
}