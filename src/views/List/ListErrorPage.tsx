import { useParams } from 'react-router-dom';

import styled from 'styled-components';

import { ContainedAnchor } from '@/components/Anchor';
import Icon from '@/components/Icon';

function ListErrorPage() {
  const { groupId } = useParams();
  return (
    <StyledListErrorPage>
      <Icon icon='error' size='l' color='grey800' />
      <StyledTitle>404 - page not found</StyledTitle>
      <StyledSubText>Cannot find a valid group id #{groupId}</StyledSubText>
      <ContainedAnchor to='/portfolio'>Go to main group</ContainedAnchor>
    </StyledListErrorPage>
  );
}

export default ListErrorPage;

const StyledListErrorPage = styled('div')`
  margin-top: 20px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  border: 1px solid ${({ theme }) => theme.colors.grey300};
  border-radius: 5px;

  ${ContainedAnchor} {
    margin-top: 0.6rem;
  }
`;

const StyledTitle = styled('span')`
  font-size: 1.2rem;
  font-weight: 600;
`;

const StyledSubText = styled('span')`
  font-size: 0.8rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.grey600};
`;
