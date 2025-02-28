import styled from 'styled-components';

import { BaseAnchor } from './BaseAnchor';
import { BaseAnchorProps } from './type';

export const UnderlineAnchor = styled(BaseAnchor)<BaseAnchorProps>(
  ({ selected, theme }) => ({
    span: {
      position: 'relative',
      color: selected ? theme.colors.black : theme.colors.grey600,
      fontWeight: 500,
    },

    '& span::after': {
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '2px',
      top: 'calc(100% + 0.8rem)',
      left: 0,
      backgroundColor: selected ? theme.colors.black : theme.colors.grey400,
      opacity: selected ? 1 : 0,
    },

    '&&:hover': {
      span: {
        color: theme.colors.black,
      },

      'span::after': {
        opacity: 1,
      },
    },
  }),
);
