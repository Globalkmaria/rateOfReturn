import styled from 'styled-components';
import { SidebarContent } from '../router';
import Sidebar from './Sidebar';

interface GeneralLayoutProps {
  children: React.ReactNode;
}

const GeneralLayout = ({ children }: GeneralLayoutProps) => {
  return (
    <StyledGeneralLayout>
      <Sidebar sidebarContent={SidebarContent} />
      <StyledMainLayout>{children}</StyledMainLayout>
    </StyledGeneralLayout>
  );
};

export default GeneralLayout;

const StyledGeneralLayout = styled('div')`
  display: flex;
`;

const StyledMainLayout = styled('main')`
  width: calc(100% - 100px);
  padding: 40px;
`;
