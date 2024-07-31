import styled from 'styled-components';

import { BorderButton } from '@/components/Button';
import Icon from '@/components/Icon';

function EditCurrentPriceSkeleton() {
  return (
    <BorderButton size='m' onClick={() => {}} disabled={true}>
      <Icon icon='priceChange' disabled={true} />
      <StyledText>Edit current prices</StyledText>
    </BorderButton>
  );
}

export default EditCurrentPriceSkeleton;

const StyledText = styled.span`
  margin-left: 5px;
  color: inherit;

  @media ${({ theme }) => theme.devices.laptop} {
    display: none;
  }
`;
