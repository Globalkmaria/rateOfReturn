import styled from 'styled-components';

import { BorderButton } from '../../../components/Button';

export const StyledBackupSkeleton = styled(BorderButton).attrs({
  disabled: true,
  size: 'm',
})`
  @media ${({ theme }) => theme.devices.mobile} {
    font-size: min(0.8rem, 5vw);
  }
`;
