import { ReactNode, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
  onCloseModal: () => void;
}

function DropboxWrapper({ children, onCloseModal }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onCloseModal();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return <Container ref={ref}>{children}</Container>;
}

export { DropboxWrapper };

const Container = styled.div`
  position: relative;
  height: fit-content;
`;
