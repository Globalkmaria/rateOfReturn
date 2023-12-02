import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { BorderButton } from '../../../../components/Button';
import { BaseInput } from '../../../../components/Input/BaseInput';
import { TableCell, TableRow } from '../../../../components/Table';
import { DeleteButton, CheckboxCell } from '../components';
import { selectStockCheckedInfo } from '../../../../features/checkedItems/selectors';
import { selectIsMainGroupSelected } from '../../../../features/groups/selectors';
import { useStockSummaryInputChange } from './hooks/useStockSummaryInputChange';
import useModal from '../../hooks/useModal';
import { DeleteStockModal } from '../DeleteStockModal';
import SummaryLock from './SummaryLock';
import SummaryContent from './SummaryContent';
import useChangeStockCheckbox from './hooks/useChangeStockCheckbox';

export type SummaryInfoData = {
  purchaseQuantitySum: number;
  purchasePriceAverage: number;
  totalPurchasePrice: number;
  evaluationPrice: number;
  evaluationProfit: number;
  profitRate: number;
};

export interface SummaryInfoProps {
  stockId: string;
}

const SummaryInfo = ({ stockId }: SummaryInfoProps) => {
  const [isLock, setIsLock] = useState(true);
  const { showModal, onOpenModal, onCloseModal } = useModal();

  const { changedInputs, initChangedInputs, onInputChange } =
    useStockSummaryInputChange(stockId);
  const checkedInfo = useSelector(selectStockCheckedInfo(stockId));
  const isMainGroupSelected = useSelector(selectIsMainGroupSelected);

  const onChangeCheckbox = useChangeStockCheckbox(stockId);

  useEffect(() => {
    setIsLock(true);
  }, [isMainGroupSelected]);

  return (
    <StyledSummaryRow>
      {isMainGroupSelected ? (
        <CheckboxCell
          disabled={!isMainGroupSelected}
          onClick={onChangeCheckbox}
          value={checkedInfo.allChecked}
          title='Check all group items'
        />
      ) : null}
      <SummaryContent
        stockId={stockId}
        isLock={isLock}
        onInputChange={onInputChange}
      />
      {isMainGroupSelected ? (
        <>
          <SummaryLock
            isLock={isLock}
            setIsLock={setIsLock}
            stockId={stockId}
            changedInputs={changedInputs}
            initChangedInputs={initChangedInputs}
          />
          <DeleteButton onClick={onOpenModal} disabled={!isMainGroupSelected} />
          {showModal && (
            <DeleteStockModal
              type='stock'
              stockId={stockId}
              purchasedId={''}
              onClose={onCloseModal}
            />
          )}
        </>
      ) : null}
    </StyledSummaryRow>
  );
};

export default SummaryInfo;

export const StyledSummaryRow = styled(TableRow)`
  background: ${({ theme }) => theme.colors.grey100};

  .stockName {
    font-weight: 700;
  }

  .total-purchase {
    border-right: ${({ theme }) => `4px double ${theme.colors.grey600}`};
  }

  ${TableCell} > ${BaseInput} {
    background: ${({ theme }) => theme.colors.grey300};
  }

  ${BorderButton} {
    border: ${({ theme }) => `1px solid ${theme.colors.grey400}`};

    &:not([disabled]):hover {
      background: ${({ theme }) => theme.colors.grey300};
    }
  }
`;
