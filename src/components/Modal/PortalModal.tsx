import { MouseEvent, ReactNode, useEffect, useRef } from 'react';

import PortalWrapper from '../PortalWrapper';
import {
  StyledCloseButton,
  StyledModal,
  StyledModalContent,
  StyledModalHeader,
  StyledModalTitle,
} from './Modal.style';
import useEscapeKey from '../../hooks/useEscapeKey';
import useHideScroll from '../../views/List/hooks/useHideScroll';

type Props = {
  children: ReactNode;
  wrapperId?: string;
  isOpen?: boolean;
  onClose?: () => void;
  showCloseButton?: boolean;
  title?: string;
  id?: string;
};

function PortalModal({
  children,
  wrapperId,
  isOpen = true,
  onClose = () => {},
  title = '',
  showCloseButton = true,
  id,
}: Props) {
  const modalBackground = useRef<HTMLDivElement>(null);
  const modalContent = useRef<HTMLDivElement>(null);
  const needHeader = !!title.length || showCloseButton;
  useEscapeKey<HTMLDivElement>({
    onClose,
    target: modalBackground,
    portalId: wrapperId,
  });
  useHideScroll({ isOpen });

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    if (
      !modalContent.current?.contains(e.target as Node) &&
      modalBackground.current?.contains(e.target as Node)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    modalContent.current && modalContent.current?.focus();
  }, []);

  if (!isOpen) return null;

  return (
    <PortalWrapper wrapperId={wrapperId}>
      <StyledModal isOpen={isOpen} onClick={onClick} ref={modalBackground}>
        <StyledModalContent
          id={id}
          ref={modalContent}
          aria-modal='true'
          role='dialog'
          tabIndex={-1}
        >
          <StyledModalHeader needHeader={needHeader}>
            <StyledModalTitle>{title}</StyledModalTitle>
            {showCloseButton && (
              <StyledCloseButton
                size='s'
                width={32}
                onClick={onClose}
                icon='close'
              />
            )}
          </StyledModalHeader>
          {children}
        </StyledModalContent>
      </StyledModal>
    </PortalWrapper>
  );
}

export default PortalModal;
