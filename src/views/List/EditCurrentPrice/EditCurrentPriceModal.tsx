import { ContainedButton } from '@/components/Button';
import PortalModal from '@/components/Modal/PortalModal';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/Table';
import styled from 'styled-components';
import { HeaderItemProps } from '../Header/HeaderItem';
import {
  selectStockInfoById,
  selectStocks,
} from '@/features/stockList/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { InputCell } from '../StockItem/components';
import { useState } from 'react';
import { selectIsLoggedIn } from '@/features/user/selectors';
import { updateStocksCurrentPrice } from '@/features/stockList/stockListSlice';
import userStocksService from '@/service/userStocks/userStocks';
import { PurchasedInputChangeProps } from '../StockItem/PurchasedStock/PurchasedStock';
import { getFixedLocaleString } from '@/utils';
import { checkCurrentPrice } from '../StockItem/validity';

interface Changes {
  [key: string]: string;
}

interface Props {
  onClose: () => void;
}

interface ItemProps {
  stockId: string;
  changes: Changes;
  onChange: PurchasedInputChangeProps;
}

function EditCurrentPriceModal({ onClose }: Props) {
  const dispatch = useDispatch();
  const [changes, setChanges] = useState<Changes>({});
  const stocks = useSelector(selectStocks);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const onInputChange: PurchasedInputChangeProps = (e, transformedValue) => {
    if (transformedValue === null) return;

    setChanges({
      ...changes,
      [e.target.name]: transformedValue[0],
    });
  };

  const onUpdate = async () => {
    if (!Object.keys(changes).length) {
      onClose();
      return;
    }

    if (isLoggedIn) {
      const result = await userStocksService.editCurrentPrices(changes);

      if (!result.success) {
        alert(result.message);
        return;
      }
    }

    const data = Object.entries(changes).reduce((acc, [id, value]) => {
      acc[id] = getFixedLocaleString(value);
      return acc;
    }, {} as { [key: string]: string });

    dispatch(updateStocksCurrentPrice(data));
    onClose();
  };

  return (
    <PortalModal title='Edit current prices' onClose={onClose}>
      <StyledModal>
        <StyledTableWrapper>
          <Table>
            <TableHeader>
              <TableRow>
                {HEADER_LIST.map(({ id, label, ...restProps }) => (
                  <TableHead key={id} id={id} {...restProps}>
                    {label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {stocks.allIds.map(stockId => (
                <Item
                  key={stockId}
                  stockId={stockId}
                  changes={changes}
                  onChange={onInputChange}
                />
              ))}
            </TableBody>
          </Table>
        </StyledTableWrapper>
        <ContainedButton onClick={onUpdate} width={150} size='m'>
          Update
        </ContainedButton>
      </StyledModal>
    </PortalModal>
  );
}

export default EditCurrentPriceModal;

const HEADER_LIST: HeaderItemProps[] = [
  {
    id: '1',
    label: 'Stock Name',
    fixedWidth: 150,
  },
  {
    id: '2',
    label: 'Current Price',
    fixedWidth: 150,
  },
];

const StyledModal = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;

  ${ContainedButton} {
    margin-top: 20px;
  }
`;

const StyledTableWrapper = styled('div')`
  max-width: 1000px;
  max-height: 500px;
  overflow: auto;
`;

function Item({ stockId, onChange, changes }: ItemProps) {
  const { mainInfo } = useSelector(selectStockInfoById(stockId));

  const value = changes[stockId] ?? mainInfo.currentPrice;

  return (
    <StyledTableRow>
      <TableCell>{mainInfo.stockName}</TableCell>
      <InputCell
        name={stockId}
        value={value}
        align='right'
        onChange={onChange}
        validation={checkCurrentPrice}
        type='decimal'
      />
    </StyledTableRow>
  );
}

const StyledTableRow = styled(TableRow)`
  &:hover {
    background: ${({ theme }) => theme.colors.grey100};
  }

  input {
    background: ${({ theme }) => theme.colors.grey200};

    &:focus {
      background: ${({ theme }) => theme.colors.grey200};
    }
  }
`;
