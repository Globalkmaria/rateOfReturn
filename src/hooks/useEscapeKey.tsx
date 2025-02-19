import { RefObject, useEffect } from 'react';

interface Props<T extends HTMLElement> {
  onClose: () => void;
  target: RefObject<T | null>;
  portalId?: string;
}
function useEscapeKey<T extends HTMLElement>({
  onClose,
  target,
  portalId = 'portal-container',
}: Props<T>) {
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (!target) return;

      const lastChild = document.getElementById(portalId)?.lastElementChild;
      if (!lastChild) return;
      if (e.key === 'Escape' && target.current === lastChild) onClose();
    };

    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [onClose, target, portalId]);
}

export default useEscapeKey;
