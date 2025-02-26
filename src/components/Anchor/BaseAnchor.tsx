import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { BaseAnchorProps } from './type';

const shouldForwardProp = (props: string) => !['selected'].includes(props);

export const BaseAnchor = styled(Link)
  .withConfig({
    shouldForwardProp,
  })
  .attrs<BaseAnchorProps>(props => ({ as: props.disabled ? 'span' : Link }))(
  ({ theme, disabled }) => ({
    textAlign: 'center',
    cursor: disabled ? 'default' : 'pointer',
    color: disabled ? theme.colors.grey400 : '',

    '&&': {
      background: disabled ? theme.colors.grey000 : '',
    },

    '&:hover': {
      background: disabled ? theme.colors.grey000 : '',
    },
  }),
);
