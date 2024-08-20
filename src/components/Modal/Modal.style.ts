import styled from 'styled-components';
import IconButton from '../IconButton';

export const StyledModal = styled('div').withConfig({
  shouldForwardProp: props => !['isOpen'].includes(props),
})<{ isOpen: boolean }>`
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

  &:focus {
    outline: none;
  }
`;

export const StyledModalHeader = styled('div').withConfig({
  shouldForwardProp: props => !['needHeader'].includes(props),
})<{ needHeader: boolean }>`
  display: ${({ needHeader }) => (needHeader ? 'flex' : 'none')};
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;
`;

export const StyledModalTitle = styled.h1`
  font-weight: 500;
  font-size: 1.2rem;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: 1rem;
  }
`;

export const StyledCloseButton = styled(IconButton)`
  border: none;
`;

export const StyledModalMessage = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.7;
  flex: 1;
`;

export const StyledModalContainer = styled('div')`
  display: flex;
  flex-direction: column;
  width: 340px;
  text-align: center;
  font-weight: 700;
`;
