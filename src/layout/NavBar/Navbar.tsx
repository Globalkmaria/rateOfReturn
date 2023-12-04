import { memo } from 'react';
import styled from 'styled-components';

import AuthBtns from './AuthBtns';
import Menu from './Menu';
import { Link } from 'react-router-dom';

export interface NavbarElement {
  id: number;
  label: string;
  path: string;
  disabled?: boolean;
}

const Navbar = () => {
  return (
    <StyledNav>
      <Link to='/'>
        <h1 className='site-name'>ROR</h1>
      </Link>
      <Menu />
      <AuthBtns />
    </StyledNav>
  );
};

export default memo(Navbar);

const StyledNav = styled('nav')`
  flex: 0 0 fit-content;
  padding: 10px 30px;
  display: grid;
  grid-template-columns: 170px 1fr 170px;
  grid-template-rows: 60px;
  align-items: center;
  grid-template-areas: 'site-name menu auth-btns';

  border-bottom: 1px solid ${({ theme }) => theme.colors.grey200};

  .site-name {
    grid-area: site-name;
    font-size: 1.2rem;
  }

  @media ${({ theme }) => theme.devices.tablet} {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(2, 60px);
    grid-template-areas:
      'site-name auth-btns'
      'menu menu';
  }
`;
