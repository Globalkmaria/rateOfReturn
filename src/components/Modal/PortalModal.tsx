import { MouseEvent, ReactNode, useRef } from 'react';

import { CgClose } from 'react-icons/cg';

import PortalWrapper from '../PortalWrapper';
import { BorderButton } from '../Button';
import { StyledModal, StyledModalContent } from './Modal.style';

type Props = {
  children: ReactNode;
  wrapperId?: string;
  isOpen?: boolean;
  onClose: () => void;
  showCloseButton?: boolean;
  title?: string;
};

function PortalModal({
  children,
  wrapperId,
  isOpen = true,
  onClose,
  title = '',
  showCloseButton = true,
}: Props) {
  const modalBackground = useRef<HTMLDivElement>(null);
  const modalContent = useRef<HTMLDivElement>(null);
  const needHeader = !!title.length || showCloseButton;
  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    if (
      !modalContent.current?.contains(e.target as Node) &&
      modalBackground.current?.contains(e.target as Node)
    ) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <PortalWrapper wrapperId={wrapperId}>
      <StyledModal isOpen={isOpen} onClick={onClick} ref={modalBackground}>
        <StyledModalContent needHeader={needHeader} ref={modalContent}>
          <div className='header'>
            <h1 className='title'>{title}</h1>
            {showCloseButton && (
              <BorderButton
                className='close-btn'
                size='s'
                showLine={false}
                width={32}
                onClick={onClose}
              >
                <CgClose />
              </BorderButton>
            )}
          </div>
          {children}
        </StyledModalContent>
      </StyledModal>
    </PortalWrapper>
  );
}

export default PortalModal;
