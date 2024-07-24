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
  color: selected === false ? theme.colors.grey600 : theme.colors.black,
  fontWeight: selected === false ? 300 : 500,

  '&&:hover': {
    background:
      selected === true
        ? 'none'
        : `${
            theme.colors[(BUTTON_COLORS[color] + '100') as keyof ColorsTypes]
          }`,

    color: theme.colors.black,
  },
}));

export const UnderlineAnchor = styled(BaseAnchor)(({ selected, theme }) => ({
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
}));
