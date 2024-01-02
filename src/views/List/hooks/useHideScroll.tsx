import { useEffect } from 'react';

interface Props {
  isOpen: boolean;
}

function useHideScroll({ isOpen }: Props) {
  useEffect(() => {
    const body = document.body;
    if (isOpen) {
      body!.style.overflow = 'hidden';
    } else {
      body!.style.overflow = 'auto';
    }
    return () => {
      body!.style.overflow = 'auto';
    };
  }, [isOpen]);
}

export default useHideScroll;
