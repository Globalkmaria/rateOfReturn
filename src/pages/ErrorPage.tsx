import React from 'react';
import { useRouteError, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ContainedButton } from '../components/Button';
import { useDispatch } from 'react-redux';
import { resetCheckedItems } from '../features/checkedItems/checkedItemsSlice';
import { restStockList } from '../features/stockList/stockListSlice';
import { resetGroups } from '../features/groups/groupsSlice';
import { handleGetDataFile } from '../utils/file';

const ErrorPage = () => {
  const dispatch = useDispatch();
  const router = useNavigate();
  const error: any = useRouteError();
  console.error(error);

  const onReset = () => {
    dispatch(resetCheckedItems());
    dispatch(restStockList());
    dispatch(resetGroups());
    localStorage.clear();
  };

  const onResetAndReturnHome = () => {
    onReset();
    router('/');
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
        onClick={handleGetDataFile}
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

      <ContainedButton onClick={onResetAndReturnHome} size='m'>
        Reset Data and Return Home
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
