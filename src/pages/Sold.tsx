import SoldTable from '@/views/Sold/Table/SoldTable';
import styled from 'styled-components';

function SoldPage() {
  return (
    <StyledContainer>
      <SoldTable />
    </StyledContainer>
  );
}

export default SoldPage;

const StyledContainer = styled('div')`
  padding: 20px;
  background: ${({ theme }) => theme.colors.greyBackground};
`;
