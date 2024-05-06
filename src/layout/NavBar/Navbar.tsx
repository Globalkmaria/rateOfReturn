import { memo } from 'react';
import styled from 'styled-components';

import AuthBtns from './AuthBtns';
import Menu from './Menu';
import { Link } from 'react-router-dom';
import Setting from './Setting';

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
        <StyledTitle>ROR</StyledTitle>
      </Link>
      <Menu />
      <RightMenu>
        <AuthBtns />
        <Setting />
      </RightMenu>
    </StyledNav>
  );
};

export default memo(Navbar);

const StyledNav = styled('nav')`
  flex: 0 0 fit-content;
  padding: 10px 30px;
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
`;

const StyledTitle = styled.h1`
  grid-area: site-name;
  font-size: 1.2rem;
`;

const RightMenu = styled('div')`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-end;
`;
