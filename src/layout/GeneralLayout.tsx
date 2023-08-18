import styled from 'styled-components';
import Navbar from './NavBar/Navbar';
import Footer from './Footer';

interface GeneralLayoutProps {
  children: React.ReactNode;
}

const GeneralLayout = ({ children }: GeneralLayoutProps) => {
  return (
    <StyledGeneralLayout>
      <Navbar />
      <StyledMainLayout>{children}</StyledMainLayout>
      <Footer />
    </StyledGeneralLayout>
  );
};

export default GeneralLayout;

const StyledGeneralLayout = styled('div')`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 350px;
`;

const StyledMainLayout = styled('main')`
  flex: 1 0 fit-content;
  background: ${({ theme }) => theme.colors.greyBackground};
`;
