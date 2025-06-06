import { useDispatch } from 'react-redux';
import { useRouteError, Link, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { isValidObject } from '@/utils/typeCheck';

import { resetUserData } from '@/features';

import { ContainedButton } from '../components/Button';
import { handleGetDataFile } from '../utils/file';

const ErrorPage = () => {
  const dispatch = useDispatch();
  const router = useNavigate();
  const error = useRouteError();
  console.error(error);

  const errorMessage = isValidObject(error)
    ? `${'statusText' in error && error.statusText} ${'message' in error && error.message}`
    : 'An unexpected error has occurred.';

  const onReset = () => {
    dispatch(resetUserData());
    localStorage.clear();
  };

  const onResetAndReturnHome = () => {
    onReset();
    router('/');
  };

  return (
    <StyledErrorPage>
      <StyledContent>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{errorMessage}</i>
        </p>
      </StyledContent>
      <Link to='/'>
        <ContainedButton as={'span'} size='m'>
          Return Home
        </ContainedButton>
      </Link>

      <StyledContent>
        {`If 'Returning Home' Does Not Work, Try Resetting Data.`}
      </StyledContent>
      <ContainedButton
        onClick={handleGetDataFile}
        title='Save File Button'
        size='m'
        color={'warning'}
      >
        Get Backup File
      </ContainedButton>

      <StyledWarning>
        If you reset data, all data will be deleted.
        <br />
        {`If you want to get backup file before reset, click the 'Get Backup File'`}
        first.
      </StyledWarning>

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
`;

const StyledContent = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 2rem;
  font-size: 1.4rem;
  text-align: center;
`;

const StyledWarning = styled(StyledContent)`
  color: red;
`;
