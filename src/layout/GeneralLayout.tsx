import styled from 'styled-components';
import Navbar from './Navbar';
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
  min-width: 1440px;
`;

const StyledMainLayout = styled('main')`
  padding: 20px;
`;
