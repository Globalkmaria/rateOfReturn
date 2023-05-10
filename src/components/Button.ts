import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

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
  secondary1: 'teal',
  secondary2: 'indigo',
  warning: 'red',
};

const HEIGHTS: Sizes = {
  s: '32px',
  m: '40px',
  l: '48px',
};

const BaseButton = styled('button').attrs((props) => ({
  type: props.type || 'button',
}))<BaseButtonProps>(({ height, width, fullWidth, size = 's' }) => ({
  padding: PADDING_SIZES[size],
  height: height ? `${height}px` : HEIGHTS[size],
  width: width ? `${width}px` : fullWidth ? '100%' : 'auto',
  borderRadius: '5px',
  fontSize: FONT_SIZES[size],
  transition: '200ms',
}));

export const BorderButton = styled(BaseButton)<BaseButtonProps>(
  ({ theme, color = 'primary' }) => ({
    border: `1px solid ${theme.colors[COLORS[color] + '300']}`,

    '&:hover': {
      background: `${theme.colors[COLORS[color] + '100']}`,
    },
  }),
);

export const ContainedButton = styled(BaseButton)<BaseButtonProps>(
  ({ theme, color = 'primary' }) => ({
    background: `${
      theme.colors[COLORS[color] + (color === 'primary' ? '100' : '000')]
    }`,

    '&:hover': {
      background: `${
        theme.colors[COLORS[color] + (color === 'primary' ? '200' : '100')]
      }`,
    },
  }),
);
