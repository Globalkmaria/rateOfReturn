import { useRef } from 'react';
import styled from 'styled-components';

import IconButton from './IconButton';
import { BaseButtonProps } from '../Button';
import Dropbox, { DropboxStyleProps } from '../Dropbox';
import useModal from '@/views/List/hooks/useModal';

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
  const { showModal, onToggleModal, onCloseModal } = useModal();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Dropbox.Wrapper ref={ref}>
      <IconButton icon={'more'} onClick={onToggleModal} size={size} />
      {showModal && (
        <Dropbox.Container
          containerRef={ref}
          onCloseModal={onCloseModal}
          vertical={vertical}
          horizontal={horizontal}
          {...resProps}
        >
          {children}
        </Dropbox.Container>
      )}
    </Dropbox.Wrapper>
  );
}

export { MoreButton };

const Container = styled.div`
  position: relative;
  height: fit-content;
`;
