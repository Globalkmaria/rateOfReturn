import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: ReactNode;
  wrapperId?: string;
};

function PortalWrapper({ children, wrapperId }: Props) {
  const containerElement =
    (wrapperId && document.getElementById(wrapperId)) ||
    document.getElementById('portal-container');
  if (!containerElement)
    throw new Error('PortalWrapper: containerElement is null');

  return createPortal(children, containerElement);
}

export default PortalWrapper;
