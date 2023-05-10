import styled from 'styled-components';
import StockList from '../views/List/StockList';
import { useDispatch, useSelector } from 'react-redux';
import { selectStocks } from '../features/stockList/stockListSlice';
import {
  initCheckedItems,
  selectCheckedItems,
} from '../features/checkedItems/checkedItemsSlice';
import { useEffect } from 'react';

interface ListProps {}

const List = (props: ListProps) => {
  const dispatch = useDispatch();
  const stocks = useSelector(selectStocks);
  const checkedItems = useSelector(selectCheckedItems);

  useEffect(() => {
    dispatch(initCheckedItems(stocks));
  }, []);

  if (Object.keys(checkedItems.stocksCheckInfo).length !== stocks.allIds.length)
    return <></>;

  return (
    <StyledList>
      <StockList />
    </StyledList>
  );
};

export default List;

const StyledList = styled('div')``;
