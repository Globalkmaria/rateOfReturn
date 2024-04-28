import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

import { ColorsTypes } from '@/styles/theme';

const SIZES = ['s', 'm', 'l'] as const;
type Sizes = { [key in (typeof SIZES)[number]]: string };
const COLOR_KEYS = [
  'primary',
  'secondary1',
  'secondary2',
  'warning',
  'primary2',
] as const;
type Colors = { [key in (typeof COLOR_KEYS)[number]]: string };
export interface BaseButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: (typeof SIZES)[number];
  color?: (typeof COLOR_KEYS)[number];
  height?: number;
  width?: number;
  fullWidth?: boolean;
}

export interface BorderButtonProps extends BaseButtonProps {
  showLine?: boolean;
}
export interface ContainedButtonProps extends BaseButtonProps {
  mode?: 'light' | 'dark';
}

const FONT_SIZES: Sizes = {
  s: '1rem',
  m: '1.2rem',
  l: '1.4rem',
};
const PADDING_SIZES: Sizes = {
  s: '0.4rem',
  m: '0.4rem 0.625rem',
  l: '0.6rem',
};

export const BUTTON_COLORS: Colors = {
  primary: 'grey',
  primary2: 'white',
  secondary1: 'indigo',
  secondary2: 'violet',
  warning: 'red',
};

const HEIGHTS: Sizes = {
  s: '32px',
  m: '40px',
  l: '48px',
};

const BaseButton = styled('button')
  .withConfig({
    shouldForwardProp: props =>
      ![
        'size',
        'color',
        'height',
        'width',
        'fullWidth',
        'disableIcon',
      ].includes(props),
  })
  .attrs(props => ({
    type: props.type || 'button',
  }))<BaseButtonProps>(
  ({ theme, height, width, fullWidth, disabled, size = 's' }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    padding: PADDING_SIZES[size],
    height: height ? `${height}px` : HEIGHTS[size],
    width: width ? `${width}px` : fullWidth ? '100%' : 'auto',
    transition: '200ms',

    background: theme.colors.white,
    borderRadius: '5px',

    fontSize: `min(${FONT_SIZES[size]}, 5vw)`,
    whiteSpace: 'nowrap',

    '&:disabled': {
      color: theme.colors.grey500,
      cursor: 'default',
    },

    svg: {
      color: disabled ? theme.colors.grey500 : 'inherit',
      path: {
        color: disabled ? theme.colors.grey500 : 'inherit',
      },
    },

    [`@media ${theme.devices.mobile}`]: {
      fontSize: 'min(0.8rem, 5vw)',
    },
  }),
);

export const BorderButton = styled(BaseButton).withConfig({
  shouldForwardProp: props => !['showLine'].includes(props),
})<BorderButtonProps>(({ theme, color = 'primary', showLine = true }) => ({
  boxShadow: `rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px`,

  '&:not([disabled]):hover': {
    background: `${
      theme.colors[(BUTTON_COLORS[color] + '100') as keyof ColorsTypes]
    }`,
  },
}));

export const ContainedButton = styled(BaseButton)<ContainedButtonProps>(
  ({ theme, color = 'primary', mode = 'dark', disabled }) => ({
    background: `${
      disabled
        ? theme.colors.grey000
        : theme.colors[
            (BUTTON_COLORS[color] +
              (mode === 'dark' ? '800' : '100')) as keyof ColorsTypes
          ]
    }`,
    color: mode === 'dark' ? theme.colors.white : theme.colors.grey900,

    '&:not([disabled]):hover': {
      background: `${
        color === 'primary2'
          ? theme.colors.grey100
          : theme.colors[
              (BUTTON_COLORS[color] +
                (mode === 'dark' ? '600' : '300')) as keyof ColorsTypes
            ]
      }`,
    },
  }),
);
