import styled from 'styled-components';
import StockList from '../views/List/StockList';
import { useDispatch, useSelector } from 'react-redux';
import { initStockList } from '../features/stockList/stockListSlice';
import { selectStockList } from '../features/stockList/selectors';
import { initCheckedItems } from '../features/checkedItems/checkedItemsSlice';
import { selectCheckedItems } from '../features/checkedItems/selectors';
import { useEffect, useState } from 'react';
import { initGroups } from '../features/groups/groupsSlice';
import { selectGroups } from '../features/groups/selectors';
import ModalSpace from '../views/List/ModalSpace';
import { getInitialCheckedItemsInfo } from '../features/checkedItems/utils';

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
    const checkedItemsInfo = getInitialCheckedItemsInfo({
      data: stocks,
      value: true,
    });
    dispatch(initCheckedItems(checkedItemsInfo));
    setFirstLoad(false);
  }, []);

  useEffect(() => {
    if (!firstLoad) localStorage.setItem('groups', JSON.stringify(groups));
  }, [groups.groups]);

  useEffect(() => {
    if (!firstLoad)
      localStorage.setItem('stockList', JSON.stringify(stockList));
  }, [stockList]);

  if (
    Object.keys(checkedItems.stocksCheckInfo).length !==
    stockList.stocks.allIds.length
  )
    return <></>;
  return (
    <StyledList>
      <StockList />
      <ModalSpace />
    </StyledList>
  );
};

export default List;

const StyledList = styled('div')``;
