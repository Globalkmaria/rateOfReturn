import { memo } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { RouterElement } from '@/router/router';

import Menu from './Menu';

export type NavbarElement = Pick<
  RouterElement,
  'id' | 'label' | 'path' | 'icon' | 'disabled'
>;

const Navbar = () => {
  return (
    <StyledNav>
      <Link to='/'>
        <StyledTitle>ROR</StyledTitle>
      </Link>
      <Menu />
    </StyledNav>
  );
};

export default memo(Navbar);

const StyledNav = styled('nav')`
  flex: 0 0 fit-content;
  padding: 10px 40px;
  display: grid;
  grid-template-columns: 80px 1fr 220px;
  grid-template-rows: 60px;
  align-items: center;
  grid-template-areas: 'site-name menu auth-btns';

  border-bottom: 1px solid ${({ theme }) => theme.colors.grey200};

  @media ${({ theme }) => theme.devices.laptop} {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(2, 60px);
    grid-template-areas:
      'site-name auth-btns'
      'menu menu';
  }

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 10px 20px;
  }
`;

const StyledTitle = styled.h1`
  grid-area: site-name;
  font-size: 1.2rem;
`;
