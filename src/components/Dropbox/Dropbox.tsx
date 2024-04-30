import styled from 'styled-components';

export interface DropboxStyleProps {
  vertical?: 'top' | 'bottom';
  horizontal?: 'left' | 'right';
  width?: number;
}

interface DropboxProps extends DropboxStyleProps, React.PropsWithChildren {}

function Dropbox({ children, ...props }: DropboxProps) {
  return <Container {...props}>{children}</Container>;
}

export default Dropbox;

const Container = styled.div.withConfig({
  shouldForwardProp: props =>
    !['width', 'vertical', 'horizontal'].includes(props),
})<DropboxStyleProps>(({ vertical, horizontal, theme, width }) => ({
  position: 'absolute',
  zIndex: 100,
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
  width: width ? `${width}px` : 'auto',
  backgroundColor: theme.colors.white,
  boxShadow: `rgba(50, 50, 93, 0.25) 1px -1px 5px -1px, rgba(0, 0, 0, 0.3) -1px 1px 3px -1px`,
  borderRadius: '5px',

  button: {
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
