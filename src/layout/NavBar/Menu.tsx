import styled from 'styled-components';
import { SidebarContent } from '../../router/router';
import { useRouter } from '../../hooks/useRouter';
import { Link } from 'react-router-dom';

type MenuProps = { selected: boolean; disabled?: boolean };

const Menu = () => {
  const { currentLevelPath } = useRouter(0);
  return (
    <StyledList>
      {SidebarContent.map(element => {
        return (
          <StyledMenuItemWrapper key={element.path}>
            <StyledMenuItem
              selected={currentLevelPath === element.path.split('/')[1]}
              disabled={element.disabled}
              to={element.path}
              as={element.disabled ? 'span' : Link}
            >
              {element.label}
            </StyledMenuItem>
          </StyledMenuItemWrapper>
        );
      })}
    </StyledList>
  );
};

export default Menu;

const StyledList = styled('ul')`
  display: flex;
  justify-content: center;
  gap: 10px;
  grid-area: menu;
`;

const StyledMenuItemWrapper = styled('li')`
  width: min(100px, 20vw);
`;

const StyledMenuItem = styled(Link)<MenuProps>`
  display: inline-block;
  padding: 10px;
  width: 100%;
  background: ${({ theme, selected }) => (selected ? theme.colors.grey100 : 'none')};
  border-radius: 10px;
  transition: '200ms';
  font-weight: 500;
  text-align: center;
  cursor: pointer;

  font-size: min(1.2rem, 5vw);

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
