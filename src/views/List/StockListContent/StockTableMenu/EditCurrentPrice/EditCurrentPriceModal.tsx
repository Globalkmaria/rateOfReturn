import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import userStocksService from '@/service/userStocks/userStocks';

import {
  selectStockInfoById,
  selectStocks,
} from '@/features/stockList/selectors';
import { updateStocksCurrentPrice } from '@/features/stockList/stockListSlice';
import { StockMainInfo } from '@/features/stockList/type';
import { selectIsLoggedIn } from '@/features/user/selectors';

import { HeaderItemProps } from '@/views/List/Header/HeaderItem';
import { InputCell } from '@/views/List/StockItem/components';
import { PurchasedInputChangeProps } from '@/views/List/StockItem/PurchasedStock/PurchasedStock';
import { checkCurrentPrice } from '@/views/List/StockItem/validity';

import { BorderButton, ContainedButton } from '@/components/Button';
import Flex from '@/components/Flex';
import { StyledModalContainer, StyledModalMessage } from '@/components/Modal';
import PortalModal from '@/components/Modal/PortalModal';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/Table';

import { getFixedLocaleString } from '@/utils';

export interface CurrentPriceChanges {
  [key: string]: StockMainInfo['currentPrice'];
}

interface Props {
  onClose: () => void;
}

function EditCurrentPriceModal({ onClose }: Props) {
  const dispatch = useDispatch();
  const [changes, setChanges] = useState<CurrentPriceChanges>({});
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
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

    const data = Object.entries(changes).reduce(
      (acc, [id, value]) => {
        acc[id] = getFixedLocaleString(value);
        return acc;
      },
      {} as { [key: string]: string },
    );

    dispatch(updateStocksCurrentPrice(data));
    setChanges({});
    onClose();
  };

  const onCloseMainModal = () => {
    if (!Object.keys(changes).length) {
      onClose();
      return;
    }

    setIsSubModalOpen(true);
  };

  const onCloseSubModal = () => setIsSubModalOpen(false);

  const onConfirmSubModal = () => {
    onCloseSubModal();
    onClose();
  };

  return (
    <>
      <PortalModal title='Edit current prices' onClose={onCloseMainModal}>
        <StyledLinkBox>
          <StyledLink
            rel='noreferrer'
            href='https://www.investing.com/'
            target='_blank'
          >
            investing.com
          </StyledLink>
        </StyledLinkBox>
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
                  <StockPriceRow
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
      {isSubModalOpen && (
        <PortalModal onClose={onCloseSubModal} showCloseButton={false}>
          <StyledModalContainer>
            <StyledModalMessage>
              Unsaved changes will be lost. <br /> Close anyway?
            </StyledModalMessage>
            <StyledButtonContainer justifyContent='center' gap={10}>
              <ContainedButton onClick={onUpdate}>Update</ContainedButton>
              <BorderButton onClick={onConfirmSubModal}>Close</BorderButton>
            </StyledButtonContainer>
          </StyledModalContainer>
        </PortalModal>
      )}
    </>
  );
}

export default EditCurrentPriceModal;

const HEADER_LIST: HeaderItemProps[] = [
  {
    id: '1',
    label: 'Stock Name',
    minWidth: 200,
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
  padding: 0 50px;

  td {
    padding: 0.4rem;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 0;
  }
`;

const StyledLinkBox = styled('div')`
  display: flex;
  justify-content: end;
`;

const StyledLink = styled('a')`
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.grey600};
`;

const StyledButtonContainer = styled(Flex)`
  margin-top: 20px;
`;

interface ItemProps {
  stockId: string;
  changes: CurrentPriceChanges;
  onChange: PurchasedInputChangeProps;
}

function StockPriceRow({ stockId, onChange, changes }: ItemProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { mainInfo } = useSelector(selectStockInfoById(stockId));

  const value = changes[stockId] ?? mainInfo.currentPrice;
  const handleFocus = () => inputRef.current?.select();

  return (
    <StyledTableRow>
      <TableCell>{mainInfo.stockName}</TableCell>
      <InputCell
        onFocus={handleFocus}
        ref={inputRef}
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
