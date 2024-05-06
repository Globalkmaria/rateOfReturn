import { selectIsMainGroupSelected } from '@/features/groups/selectors';
import useModal from '../hooks/useModal';
import { useSelector } from 'react-redux';
import { selectStockIds } from '@/features/selectors';
import { BorderButton } from '@/components/Button';
import EditCurrentPriceModal from './EditCurrentPriceModal';

function EditCurrentPrice() {
  const isMainGroup = useSelector(selectIsMainGroupSelected);
  const { showModal, onCloseModal, onToggleModal } = useModal();
  const noUserStockData = useSelector(selectStockIds).length === 0;

  if (!isMainGroup) return null;

  return (
    <>
      <BorderButton size='m' onClick={onToggleModal} disabled={noUserStockData}>
        Edit Current Prices
      </BorderButton>
      {showModal && <EditCurrentPriceModal onClose={onCloseModal} />}
    </>
  );
}

export default EditCurrentPrice;
