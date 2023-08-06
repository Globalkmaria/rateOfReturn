import React from 'react';
import styled from 'styled-components';
import { SidebarContent } from '../../router/router';
import { useRouter } from '../../hooks/useRouter';

type MenuProps = { selected: boolean; disabled?: boolean };

const Menu = () => {
  const { routeTo, currentLevelPath } = useRouter(0);
  const menuClickHandler = (path: string) => routeTo(path);
  return (
    <StyledList>
      {SidebarContent.map((element) => {
        return (
          <StyledMenu
            key={element.path}
            selected={currentLevelPath === element.path.split('/')[1]}
            onClick={() => !element.disabled && menuClickHandler(element.path)}
            disabled={element.disabled}
          >
            {element.label}
          </StyledMenu>
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
`;

const StyledMenu = styled('li')<MenuProps>`
  padding: 10px;
  width: 100px;
  background: ${({ theme, selected }) =>
    selected ? theme.colors.grey100 : 'none'};
  border-radius: 10px;
  transition: '200ms';
  font-weight: 500;
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
