import styled from 'styled-components';
import AuthBtns from './AuthBtns';
import Menu from './Menu';
export interface NavbarElement {
  id: number;
  label: string;
  path: string;
  disabled?: boolean;
}

const Navbar = () => {
  return (
    <StyledNav>
      <h1 className='site-name'>ROR</h1>
      <Menu />
      <AuthBtns />
    </StyledNav>
  );
};

export default Navbar;

const StyledNav = styled('nav')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
  padding: 10px 30px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey200};

  .site-name {
    width: 170px;
    font-size: 1.2rem;
  }
`;
