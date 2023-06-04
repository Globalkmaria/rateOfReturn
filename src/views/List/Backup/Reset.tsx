import React from 'react';
import styled from 'styled-components';
import { ContainedButton } from '../../../components/Button';
import { useDispatch } from 'react-redux';
import { openStockModal } from '../../../features/stockModal/stockModalSlice';

const Reset = () => {
  const dispatch = useDispatch();
  const onClick = () =>
    dispatch(openStockModal({ modalName: 'ResetDataWarning' }));

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
