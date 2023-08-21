import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { selectStockModals } from '../../features/stockModal/stockModalSlice';
import MergeLocalDataModal from './MergeLocalDataModal';

type Modal = {
  modalName: string;
  Component: () => JSX.Element;
};

const HomeModalSpace = () => {
  const modalState = useSelector(selectStockModals);
  return (
    <StyledHomeModalSpace>
      {MODALS.map(
        ({ modalName, Component }) =>
          modalState?.[modalName]?.isOpen && <Component key={modalName} />,
      )}
    </StyledHomeModalSpace>
  );
};

export default HomeModalSpace;
const MODALS: Modal[] = [
  { modalName: 'MergeLocalDataModal', Component: MergeLocalDataModal },
];

const StyledHomeModalSpace = styled('div')`
  position: relative;
  z-index: 9999;
`;
