import React, { ReactNode } from 'react';
import { useRouteError, Link } from 'react-router-dom';
import styled from 'styled-components';
import { ContainedButton } from '../components/Button';

interface ErrorPageProps {}

const ErrorPage = ({}: ErrorPageProps) => {
  const error: any = useRouteError();
  console.error(error);
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

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    line-height: 2rem;
    font-size: 1.4rem;
  }
`;
