import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { ColorsTypes } from '../styles/theme';

const SIZES = ['s', 'm', 'l'] as const;
type Sizes = { [key in (typeof SIZES)[number]]: string };
const COLOR_KEYS = ['primary', 'secondary1', 'secondary2', 'warning'] as const;
type Colors = { [key in (typeof COLOR_KEYS)[number]]: string };
export interface BaseButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: (typeof SIZES)[number];
  color?: (typeof COLOR_KEYS)[number];
  height?: number;
  width?: number;
  fullWidth?: boolean;
  disableIcon?: boolean;
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

const COLORS: Colors = {
  primary: 'grey',
  secondary1: 'indigo',
  secondary2: 'violet',
  warning: 'red',
};

const HEIGHTS: Sizes = {
  s: '32px',
  m: '40px',
  l: '48px',
};

const BaseButton = styled('button').attrs((props) => ({
  type: props.type || 'button',
}))<BaseButtonProps>(
  ({ theme, height, width, fullWidth, disableIcon, size = 's' }) => ({
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

    '&[class^="Button"]:disabled': {
      color: theme.colors.grey500,
      cursor: 'default',
    },

    svg: {
      color: disableIcon ? theme.colors.grey500 : 'inherit',
      path: {
        color: disableIcon ? theme.colors.grey500 : 'inherit',
      },
    },
  }),
);

export const BorderButton = styled(BaseButton)<BorderButtonProps>(
  ({ theme, color = 'primary', showLine = true }) => ({
    boxShadow: `rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px`,

    '&:not([disabled]):hover': {
      background: `${
        theme.colors[(COLORS[color] + '100') as keyof ColorsTypes]
      }`,
    },
  }),
);

export const ContainedButton = styled(BaseButton)<ContainedButtonProps>(
  ({ theme, color = 'primary', mode = 'dark' }) => ({
    background: `${
      theme.colors[
        (COLORS[color] + (mode === 'dark' ? '800' : '100')) as keyof ColorsTypes
      ]
    }`,
    color: mode === 'dark' ? theme.colors.white : theme.colors.grey900,

    '&:not([disabled]):hover': {
      background: `${
        theme.colors[
          (COLORS[color] +
            (mode === 'dark' ? '600' : '300')) as keyof ColorsTypes
        ]
      }`,
    },
  }),
);
