import React from 'react';
import { useRouter } from '../hooks/useRouter';
import styled from 'styled-components';

export interface SidebarElement {
  id: number;
  label: string;
  path: string;
}

interface SidebarProps {
  sidebarContent: SidebarElement[];
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarContent }) => {
  const { currentPath, routeTo } = useRouter();

  const sidebarMenuClickHandler = (path: string) => {
    routeTo(path);
  };

  return (
    <StyledSidebar>
      <ul>
        {sidebarContent.map((element) => {
          return (
            <StyledMenu
              key={element.path}
              selected={currentPath === element.path}
              onClick={() => sidebarMenuClickHandler(element.path)}
            >
              {element.label}
            </StyledMenu>
          );
        })}
      </ul>
    </StyledSidebar>
  );
};

export default Sidebar;

type MenuProps = { selected: boolean };

const StyledSidebar = styled('nav')`
  width: 100px;
  height: fit-content;
  border: 1px solid ${({ theme }) => theme.colors.grey200};
`;

const StyledMenu = styled('li')<MenuProps>`
  padding: 10px;
  background: ${({ theme, selected }) =>
    selected ? theme.colors.grey100 : 'none'};
  transition: '200ms';
  font-size: 1.5rem;
  text-align: center;

  &:hover {
    background: ${({ theme }) => theme.colors.grey100};
  }
`;
