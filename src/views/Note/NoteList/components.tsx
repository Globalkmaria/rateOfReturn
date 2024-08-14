import Flex from '@/components/Flex';
import Icon, { IconProps } from '@/components/Icon';
import styled from 'styled-components';

export const StyledDate = styled(Flex)`
  display: flex;
  gap: 5px;
  color: ${({ theme }) => theme.colors.grey700};

  @media ${({ theme }) => theme.devices.tablet} {
    font-size: 0.7rem;
  }
`;

export const StyledDateIcon = styled(Icon).attrs<Partial<IconProps>>({
  icon: 'calendar',
  color: 'grey700',
})``;
