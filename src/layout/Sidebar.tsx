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
    <SidebarComponent>
      <ul>
        {sidebarContent.map((element) => {
          return (
            <Menu
              key={element.path}
              selected={currentPath === element.path}
              onClick={() => sidebarMenuClickHandler(element.path)}
            >
              {element.label}
            </Menu>
          );
        })}
      </ul>
    </SidebarComponent>
  );
};

export default Sidebar;

type MenuProps = { selected: boolean };

const SidebarComponent = styled('nav')`
  width: 100px;
`;
const Menu = styled('li')<MenuProps>`
  margin: auto;
  padding: 10px;
  background: ${({ theme, selected }) =>
    selected ? theme.colors.grey100 : 'none'};
  font-size: 1.5rem;
`;
