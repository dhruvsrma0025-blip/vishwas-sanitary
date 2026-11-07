import { useEffect, useRef } from 'react';

/** Calls a handler on Escape without re-subscribing on every render. */
export function useEscapeKey(handler, enabled = true) {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!enabled) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') handlerRef.current?.(event);
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [enabled]);
}
