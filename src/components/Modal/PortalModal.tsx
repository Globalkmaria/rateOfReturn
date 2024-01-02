import { MouseEvent, ReactNode, useRef } from 'react';

import { CgClose } from 'react-icons/cg';

import PortalWrapper from '../PortalWrapper';
import { StyledCloseButton, StyledModal, StyledModalContent, StyledModalHeader, StyledModalTitle } from './Modal.style';
import useEscapeKey from '../../hooks/useEscapeKey';
import useHideScroll from '../../views/List/hooks/useHideScroll';

type Props = {
  children: ReactNode;
  wrapperId?: string;
  isOpen?: boolean;
  onClose: () => void;
  showCloseButton?: boolean;
  title?: string;
};

function PortalModal({ children, wrapperId, isOpen = true, onClose, title = '', showCloseButton = true }: Props) {
  const modalBackground = useRef<HTMLDivElement>(null);
  const modalContent = useRef<HTMLDivElement>(null);
  const needHeader = !!title.length || showCloseButton;
  useEscapeKey({ onClose, target: modalBackground, portalId: wrapperId });
  useHideScroll({ isOpen });

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!modalContent.current?.contains(e.target as Node) && modalBackground.current?.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <PortalWrapper wrapperId={wrapperId}>
      <StyledModal isOpen={isOpen} onClick={onClick} ref={modalBackground}>
        <StyledModalContent ref={modalContent}>
          <StyledModalHeader needHeader={needHeader}>
            <StyledModalTitle>{title}</StyledModalTitle>
            {showCloseButton && (
              <StyledCloseButton size='s' showLine={false} width={32} onClick={onClose}>
                <CgClose />
              </StyledCloseButton>
            )}
          </StyledModalHeader>
          {children}
        </StyledModalContent>
      </StyledModal>
    </PortalWrapper>
  );
}

export default PortalModal;
