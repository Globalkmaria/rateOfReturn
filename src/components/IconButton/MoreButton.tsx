import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import IconButton from './IconButton';
import { BaseButtonProps } from '../Button';
import Dropbox, { DropboxStyleProps } from '../Dropbox/Dropbox';

interface Props extends DropboxStyleProps, React.PropsWithChildren {
  disabled?: boolean;
  size?: BaseButtonProps['size'];
}

function MoreButton({
  children,
  vertical,
  horizontal,
  size,
  ...resProps
}: Props) {
  const [isOpened, setIsOpened] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpened(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <Container ref={ref}>
      <IconButton
        icon={'more'}
        onClick={() => setIsOpened(!isOpened)}
        size={size}
      />
      {isOpened && (
        <Dropbox vertical={vertical} horizontal={horizontal} {...resProps}>
          {children}
        </Dropbox>
      )}
    </Container>
  );
}

export { MoreButton };

const Container = styled.div`
  position: relative;
  height: fit-content;
`;
