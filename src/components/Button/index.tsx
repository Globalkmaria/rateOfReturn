import { ButtonHTMLAttributes } from 'react';

import styled from 'styled-components';

import { ColorsTypes } from '@/styles/theme';

import { HoverDarker, getHoverColor } from './helper';

const _SIZES = ['s', 'm', 'l'] as const;
type Sizes = { [key in (typeof _SIZES)[number]]: string };
const _COLOR_KEYS = [
  'primary',
  'secondary1',
  'secondary2',
  'warning',
  'primary2',
] as const;
type Colors = { [key in (typeof _COLOR_KEYS)[number]]: string };
export interface BaseButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: (typeof _SIZES)[number];
  color?: (typeof _COLOR_KEYS)[number];
  height?: number;
  width?: number;
  fullWidth?: boolean;
}

export interface BorderButtonProps extends BaseButtonProps {
  showLine?: boolean;
}

export interface BackgroundButtonProps extends BaseButtonProps {
  hoverDarker?: HoverDarker;
}

export interface ContainedButtonProps extends BaseButtonProps {
  mode?: 'light' | 'dark';
}

const FONT_SIZES: Sizes = {
  s: '0.75rem',
  m: '0.9rem',
  l: '0.9rem',
};

const PADDING_SIZES: Sizes = {
  s: '0.625rem',
  m: '0.8rem',
  l: '1rem',
};

export const BUTTON_COLORS: Colors = {
  primary: 'grey',
  primary2: 'white',
  secondary1: 'indigo',
  secondary2: 'violet',
  warning: 'red',
};

export const BUTTON_HEIGHTS: Sizes = {
  s: '40px',
  m: '42px',
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
  }))<BaseButtonProps>(({ theme, height, width, fullWidth, size = 's' }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  padding: `0px ${PADDING_SIZES[size]}`,
  height: height ? `${height}px` : BUTTON_HEIGHTS[size],
  width: width ? `${width}px` : fullWidth ? '100%' : 'auto',
  transition: '100ms',

  borderRadius: '12px',

  fontSize: `min(${FONT_SIZES[size]}, 5vw)`,
  whiteSpace: 'nowrap',
  fontWeight: 500,

  '&:disabled': {
    color: theme.colors.grey500,
    cursor: 'not-allowed',
  },

  [`@media ${theme.devices.mobile}`]: {
    fontSize: 'min(0.8rem, 5vw)',
  },
}));

export const BackgroundButton = styled(BaseButton).withConfig({
  shouldForwardProp: props => !['hoverDarker', 'showLine'].includes(props),
})<BackgroundButtonProps>(({ theme, color = 'primary', hoverDarker = 0 }) => ({
  '&:not([disabled]):hover': {
    background:
      theme.colors[
        (BUTTON_COLORS[color] + getHoverColor(hoverDarker)) as keyof ColorsTypes
      ],
  },
}));

export const BorderButton = styled(BaseButton).withConfig({
  shouldForwardProp: props => !['showLine'].includes(props),
})<BorderButtonProps>(({ theme, color = 'primary', showLine = true }) => ({
  border: `1px solid ${
    theme.colors[(BUTTON_COLORS[color] + '300') as keyof ColorsTypes]
  }`,

  borderColor: showLine
    ? theme.colors[(BUTTON_COLORS[color] + '300') as keyof ColorsTypes]
    : '',

  span: {
    color: 'inherit',
  },

  '&:not([disabled]):hover': {
    background: theme.colors.grey100,
    border: `1px solid ${
      theme.colors[(BUTTON_COLORS[color] + '900') as keyof ColorsTypes]
    }`,
  },
}));

export const BorderWithHoverShadowButton = styled(BaseButton).withConfig({
  shouldForwardProp: props => !['showLine'].includes(props),
})<BorderButtonProps>(({ theme, color = 'primary' }) => ({
  border: `1px solid ${
    theme.colors[(BUTTON_COLORS[color] + '300') as keyof ColorsTypes]
  }`,

  '&:not([disabled]):hover': {
    boxShadow: `rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px`,
  },
}));

export const ContainedButton = styled(BaseButton).withConfig({
  shouldForwardProp: props => !['showLine'].includes(props),
})<ContainedButtonProps>(
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
