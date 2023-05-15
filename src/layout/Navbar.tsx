import { useRouter } from '../hooks/useRouter';
import styled from 'styled-components';
import { SidebarContent } from '../router';

export interface NavbarElement {
  id: number;
  label: string;
  path: string;
  disabled?: boolean;
}

const Navbar = () => {
  const { currentPath, routeTo } = useRouter();
  const navbarContent = SidebarContent;

  const menuClickHandler = (path: string) => {
    routeTo(path);
  };

  return (
    <StyledNav>
      <ul className='menu-list'>
        {navbarContent.map((element) => {
          return (
            <StyledMenu
              key={element.path}
              selected={currentPath === element.path}
              onClick={() =>
                !element.disabled && menuClickHandler(element.path)
              }
              disabled={element.disabled}
            >
              {element.label}
            </StyledMenu>
          );
        })}
      </ul>
    </StyledNav>
  );
};

export default Navbar;

type MenuProps = { selected: boolean; disabled?: boolean };

const StyledNav = styled('nav')`
  height: fit-content;
  border-bottom: 2px solid ${({ theme }) => theme.colors.grey200};
  padding: 10px;

  .menu-list {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
`;

const StyledMenu = styled('li')<MenuProps>`
  padding: 10px;
  width: 100px;
  background: ${({ theme, selected }) =>
    selected ? theme.colors.grey100 : 'none'};
  border-radius: 10px;
  transition: '200ms';
  font-size: 1.5rem;
  text-align: center;
  cursor: pointer;

  &:hover {
    background: ${({ theme, disabled }) => !disabled && theme.colors.grey100};
  }

  ${({ disabled, theme }) =>
    disabled && {
      background: 'none',
      color: theme.colors.grey400,
      cursor: 'default',
    }}
`;
