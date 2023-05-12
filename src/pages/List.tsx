import styled from 'styled-components';
import StockList from '../views/List/StockList';
import { useDispatch, useSelector } from 'react-redux';
import {
  initStockList,
  selectStockList,
} from '../features/stockList/stockListSlice';
import {
  initCheckedItems,
  selectCheckedItems,
} from '../features/checkedItems/checkedItemsSlice';
import { useEffect, useState } from 'react';
import { initGroups, selectGroups } from '../features/groups/groupsSlice';

const List = () => {
  const [firstLoad, setFirstLoad] = useState(true);
  const dispatch = useDispatch();
  const stockList = useSelector(selectStockList);
  const checkedItems = useSelector(selectCheckedItems);
  const groups = useSelector(selectGroups);

  useEffect(() => {
    const localStock = localStorage.getItem('stockList');
    const localGroups = localStorage.getItem('groups');
    localStock && dispatch(initStockList(JSON.parse(localStock)));
    localGroups && dispatch(initGroups(JSON.parse(localGroups)));

    const stocks = localStock
      ? JSON.parse(localStock).stocks
      : stockList.stocks;
    dispatch(initCheckedItems(stocks));
    setFirstLoad(false);
    dispatch(initCheckedItems(stocks));
  }, []);

  useEffect(() => {
    if (!firstLoad) {
      localStorage.setItem('groups', JSON.stringify(groups));
    }
  }, [groups.groups]);

  useEffect(() => {
    if (!firstLoad) {
      localStorage.setItem('stockList', JSON.stringify(stockList));
    }
  }, [stockList]);

  if (
    Object.keys(checkedItems.stocksCheckInfo).length !==
    stockList.stocks.allIds.length
  )
    return <></>;
  return (
    <StyledList>
      <StockList />
    </StyledList>
  );
};

export default List;

const StyledList = styled('div')``;
