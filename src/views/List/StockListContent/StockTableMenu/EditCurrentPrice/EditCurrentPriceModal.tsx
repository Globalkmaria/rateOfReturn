import { useState, useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import stockService from '@/service/stocks/service';
import userStocksService from '@/service/userStocks/userStocks';

import { selectStocks } from '@/features/stockList/selectors';
import { updateStocksCurrentPrice } from '@/features/stockList/stockListSlice';
import { StockMainInfo } from '@/features/stockList/type';
import { selectIsLoggedIn } from '@/features/user/selectors';

import { HeaderItemProps } from '@/views/List/Header/HeaderItem';
import { PurchasedInputChangeProps } from '@/views/List/StockItem/PurchasedStock/PurchasedStock';

import { BorderButton, ContainedButton } from '@/components/Button';
import Flex from '@/components/Flex';
import { StyledModalContainer, StyledModalMessage } from '@/components/Modal';
import PortalModal from '@/components/Modal/PortalModal';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/table/Table';

import EditCurrentPriceStockRow from './EditCurrentPriceStockRow';
import {
  formatPricesForStore,
  getCurrentPriceChanges,
  getFailedSymbols,
  getFailedSymbolsErrorMessage,
} from './helper';

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
  const [isPending, startTransition] = useTransition();
  const [errorIds, setErrorIds] = useState(new Set<string>());
  const stocks = useSelector(selectStocks);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const priceButtonText = isPending ? 'Loading...' : 'Get Price';

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

    dispatch(updateStocksCurrentPrice(formatPricesForStore(changes)));
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

  const getPrice = () => {
    startTransition(async () => {
      const result = await stockService.getPrice(
        stocks.allIds.map(id => stocks.byId[id].mainInfo.symbol),
      );

      if (!result.success) {
        alert(result.message);
        return;
      }

      const newChanges = getCurrentPriceChanges({
        stocks,
        changes,
        fetchedQuotes: result.data.data.quotes,
      });
      setChanges(newChanges);

      if (result.data.failedSymbols.length) {
        alert(getFailedSymbolsErrorMessage(result.data.failedSymbols));

        const errorIds = getFailedSymbols(stocks, result.data.failedSymbols);
        setErrorIds(errorIds);
      }
    });
  };

  return (
    <>
      <PortalModal title='Edit current prices' onClose={onCloseMainModal}>
        <StyledLinkBox>
          <StyledLink
            rel='noreferrer'
            href='https://finance.yahoo.com'
            target='_blank'
          >
            finance.yahoo.com
          </StyledLink>
          <StyledPriceButtonContainer>
            <BorderButton size='s' onClick={getPrice} disabled={isPending}>
              {priceButtonText}
            </BorderButton>
            <StyledHelperText>
              Previous close prices are updated when Get Price button is
              clicked.
            </StyledHelperText>
          </StyledPriceButtonContainer>
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
                  <EditCurrentPriceStockRow
                    key={stockId}
                    stockId={stockId}
                    changes={changes}
                    onChange={onInputChange}
                    isError={errorIds.has(stockId)}
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
    label: 'Symbol',
    minWidth: 80,
  },
  {
    id: '2',
    label: 'Stock Name',
    minWidth: 80,
  },
  {
    id: '3',
    label: 'Current Price',
    fixedWidth: 100,
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
  width: 100%;
  max-width: 1000px;
  max-height: 500px;
  overflow: auto;
  padding: 0 50px;

  td {
    padding: 0.4rem;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 0;

    th,
    td {
      font-size: 0.7rem;
    }
  }
`;

const StyledLinkBox = styled('div')`
  display: flex;
  justify-content: space-between;
`;

const StyledLink = styled('a')`
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.grey600};
`;

const StyledPriceButtonContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
`;

const StyledHelperText = styled('p')`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.grey600};
`;

const StyledButtonContainer = styled(Flex)`
  margin-top: 20px;
`;
