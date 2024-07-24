import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { ColorsTypes } from '@/styles/theme';
import {
  BUTTON_COLORS,
  BackgroundButton,
  BorderButton,
  ContainedButton,
} from './Button';

type AnchorProps = {
  disabled?: boolean;
  selected?: boolean;
  color?: keyof typeof BUTTON_COLORS;
};

const BaseAnchor = styled(Link)
  .withConfig({
    shouldForwardProp: props => !['selected'].includes(props),
  })
  .attrs<AnchorProps>(props => ({ as: props.disabled ? 'span' : Link }))(
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

export const BorderAnchor = styled(BorderButton).attrs({
  as: BaseAnchor,
})(({ selected, theme, color = 'primary' }) => ({
  background: selected
    ? `${theme.colors[(BUTTON_COLORS[color] + '100') as keyof ColorsTypes]}`
    : '',
}));

export const ContainedAnchor = styled(ContainedButton).attrs({
  as: BaseAnchor,
})(({ selected, theme, color = 'primary', mode = 'dark' }) => ({
  background: selected
    ? `${
        color === 'primary2'
          ? theme.colors.grey100
          : theme.colors[
              (BUTTON_COLORS[color] +
                (mode === 'dark' ? '800' : '100')) as keyof ColorsTypes
            ]
      }`
    : '',
}));

export const BackgroundAnchor = styled(BackgroundButton).attrs({
  as: BaseAnchor,
})(({ selected, theme, color = 'primary' }) => ({
  '&&:hover': {
    background:
      selected === true
        ? 'none'
        : `${
            theme.colors[(BUTTON_COLORS[color] + '100') as keyof ColorsTypes]
          }`,

    color: theme.colors.grey900,
  },

  color: selected === false ? theme.colors.grey600 : theme.colors.grey900,
  fontWeight: selected === false ? 300 : 500,
}));
