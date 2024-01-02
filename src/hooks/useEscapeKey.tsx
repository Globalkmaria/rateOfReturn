import { RefObject, useEffect } from 'react';

interface Props {
  onClose: () => void;
  target: RefObject<HTMLElement> | null;
  portalId?: string;
}
function useEscapeKey({ onClose, target, portalId = 'portal-container' }: Props) {
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
