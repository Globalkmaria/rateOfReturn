import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

const SIZES = ['s', 'm', 'l'] as const;
type Sizes = { [key in typeof SIZES[number]]: string };
const FONT_SIZES: Sizes = {
  s: '1rem',
  m: '1.25rem',
  l: '1.5rem',
};
const PADDING_SIZES: Sizes = {
  s: '0.4rem',
  m: '0.4rem 0.625rem',
  l: '0.875rem',
};

const COLOR_KEYS = ['primary', 'secondary', 'warning'] as const;
type Colors = { [key in typeof COLOR_KEYS[number]]: string };
const COLORS: Colors = {
  primary: 'grey',
  secondary: 'blue',
  warning: 'red',
};

const HEIGHTS = [32, 40] as const;

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: typeof SIZES[number];
  color?: typeof COLOR_KEYS[number];
  height?: typeof HEIGHTS[number];
  width?: number;
  fullWidth?: boolean;
}

const BaseButton = styled('button')<BaseButtonProps>(
  ({ height = 40, width, fullWidth, size = 's' }) => ({
    padding: PADDING_SIZES[size],
    height: `${height}px`,
    width: width ? `${width}px` : fullWidth ? '100%' : 'auto',
    borderRadius: '5px',
    fontSize: FONT_SIZES[size],
    transition: '200ms',
  }),
);

export const BorderButton = styled(BaseButton)<BaseButtonProps>(
  ({ theme, color = 'primary' }) => ({
    border: `1px solid ${theme.colors[COLORS[color] + '200']}`,

    '&:hover': {
      background: `${theme.colors[COLORS[color] + '100']}`,
    },
  }),
);

export const ContainedButton = styled(BaseButton)<BaseButtonProps>(
  ({ theme, color = 'primary' }) => ({
    background: `${theme.colors[COLORS[color] + '200']}`,

    '&:hover': {
      background: `${theme.colors[COLORS[color] + '300']}`,
    },
  }),
);
