import styled from 'styled-components';
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

export const StyledModalContent = styled('div')<{ needHeader: boolean }>`
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

  .header {
    display: ${({ needHeader }) => (needHeader ? 'flex' : 'none')};
    margin-bottom: 10px;
    justify-content: space-between;
    align-items: center;
  }

  .title {
    font-weight: 700;
    font-size: 1.4rem;
  }

  ${BorderButton}.close-btn {
    align-self: flex-end;
    border: none;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    .title {
      font-size: 1.2rem;
    }
  }
`;
