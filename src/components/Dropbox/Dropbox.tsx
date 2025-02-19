import { useEffect } from 'react';
import styled from 'styled-components';

export interface DropboxStyleProps {
  vertical?: 'top' | 'bottom';
  horizontal?: 'left' | 'right';
  width?: number;
}

interface DropboxProps<T extends HTMLElement>
  extends DropboxStyleProps,
    React.PropsWithChildren {
  containerRef: React.RefObject<T | null>;
  onCloseModal: () => void;
}

function Dropbox<T extends HTMLElement>({
  children,
  containerRef,
  onCloseModal,
  ...props
}: DropboxProps<T>) {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if ((e.target as Element).closest('div[role="dialog"]')) return;
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        onCloseModal();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <Container className='drop-container' {...props}>
      {children}
    </Container>
  );
}

export default Dropbox;

const Container = styled.div.withConfig({
  shouldForwardProp: props =>
    !['width', 'vertical', 'horizontal'].includes(props),
})<DropboxStyleProps>(({ vertical, horizontal, theme, width }) => ({
  position: 'absolute',
  zIndex: 1,
  ...(vertical === 'bottom' && {
    top: '100%',
    marginTop: '5px',
  }),
  ...(vertical === 'top' && {
    bottom: '100%',
    marginBottom: '5px',
  }),
  ...(horizontal === 'right' && {
    right: '0px',
  }),

  padding: '5px 0',
  width: 'max-content',
  minWidth: width ? `${width}px` : '',
  backgroundColor: theme.colors.white,
  boxShadow: `rgba(50, 50, 93, 0.25) 1px -1px 5px -1px, rgba(0, 0, 0, 0.3) -1px 1px 3px -1px`,
  borderRadius: '5px',

  'a, button': {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    padding: '5px 10px',
    width: '100%',
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: theme.colors.grey100,
    },
  },
}));
