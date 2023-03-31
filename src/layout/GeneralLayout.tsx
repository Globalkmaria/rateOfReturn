import React from 'react';
import styled from 'styled-components';
import { SidebarContent } from '../router';
import Sidebar from './Sidebar';

interface GeneralLayoutProps {
  children: React.ReactNode;
}

const GeneralLayout: React.FC<GeneralLayoutProps> = ({ children }) => {
  return (
    <GeneralLayoutComponent>
      <Sidebar sidebarContent={SidebarContent} />
      <MainLayoutComponent>{children}</MainLayoutComponent>
    </GeneralLayoutComponent>
  );
};

export default GeneralLayout;

const GeneralLayoutComponent = styled('div')`
  display: flex;
`;

const MainLayoutComponent = styled('main')`
  margin: 40px;
`;
