import styled from 'styled-components/macro';

import { BorderButton } from '../Button';

export const StyledModal = styled('div')<{ isOpen: boolean }>`
  z-index: 9999;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
`;

export const StyledModalContent = styled('div')`
  display: flex;
  flex-direction: column;
  position: absolute;
  padding: 20px;
  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.colors.grey700};
  min-height: 100px;
  min-width: 200px;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
`;

export const StyledModalHeader = styled('div')<{ needHeader: boolean }>`
  display: ${({ needHeader }) => (needHeader ? 'flex' : 'none')};
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;
`;

export const StyledModalTitle = styled.h1`
  font-weight: 700;
  font-size: 1.4rem;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: 1.2rem;
  }
`;

export const StyledCloseButton = styled(BorderButton)`
  align-self: flex-end;
  border: none;
`;
