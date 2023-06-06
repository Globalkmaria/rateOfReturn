import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import styled from 'styled-components';
import { ContainedButton } from '../components/Button';
import { useDispatch } from 'react-redux';
import { resetStockModal } from '../features/stockModal/stockModalSlice';
import { saveAs } from 'file-saver';
import { resetCheckedItems } from '../features/checkedItems/checkedItemsSlice';
import { restStockList } from '../features/stockList/stockListSlice';
import { resetGroups } from '../features/groups/groupsSlice';
import { store } from '../store';
import { getCurrentDateTimeString } from '../views/List/Backup/utils';

const ErrorPage = () => {
  const error: any = useRouteError();
  console.error(error);

  const dispatch = useDispatch();

  const handleSave = () => {
    const data = store.getState();
    const blob = new Blob([JSON.stringify(data)], {
      type: 'application/json',
    });
    const date = getCurrentDateTimeString();
    saveAs(blob, `RoR${date}.json`);
  };

  const onReset = () => {
    dispatch(resetCheckedItems());
    dispatch(restStockList());
    dispatch(resetStockModal());
    dispatch(resetGroups());
  };

  return (
    <StyledErrorPage>
      <div className='content'>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
      <ContainedButton size='m'>
        <Link to='/'>Return Home</Link>
      </ContainedButton>

      <p className='content'>
        If 'Returning Home' Does Not Work, Try Resetting Data.
      </p>
      <ContainedButton
        onClick={handleSave}
        title='Save File Button'
        size='m'
        color={'warning'}
      >
        Get Backup File
      </ContainedButton>

      <p className='content warning'>
        If you reset data, all data will be deleted.
        <br />
        If you want to get backup file before reset, click the 'Get Backup File'
        first.
      </p>

      <ContainedButton onClick={onReset} size='m'>
        Reset Data
      </ContainedButton>
    </StyledErrorPage>
  );
};

export default ErrorPage;

const StyledErrorPage = styled('div')`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 2rem;
    font-size: 1.4rem;
    text-align: center;
  }
  .warning {
    color: red;
  }
`;
