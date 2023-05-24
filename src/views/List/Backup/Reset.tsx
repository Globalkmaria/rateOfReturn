import React from 'react';
import styled from 'styled-components';
import { ContainedButton } from '../../../components/Button';
import { useDispatch } from 'react-redux';
import { restStockList } from '../../../features/stockList/stockListSlice';
import { resetStockModal } from '../../../features/stockModal/stockModalSlice';
import { resetGroups } from '../../../features/groups/groupsSlice';
import { resetCheckedItems } from '../../../features/checkedItems/checkedItemsSlice';

const Reset = () => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(resetCheckedItems());
    dispatch(restStockList());
    dispatch(resetStockModal());
    dispatch(resetGroups());
  };

  return (
    <StyledReset>
      <ContainedButton onClick={onClick} color='warning' fullWidth>
        Reset
      </ContainedButton>
    </StyledReset>
  );
};

export default Reset;

const StyledReset = styled('div')``;
