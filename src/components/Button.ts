import styled from 'styled-components';

const SIZE = ['s', 'm', 'l'] as const;
type Sizes = { [key in typeof SIZE[number]]: string };
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

interface BaseButtonProps {
  size?: typeof SIZE[number];
  color?: typeof COLOR_KEYS[number];
}

const BaseButton = styled('button')<BaseButtonProps>(({ size = 's' }) => {
  return {
    padding: PADDING_SIZES[size],
    borderRadius: '5px',
    fontSize: FONT_SIZES[size],
    transition: '200ms',
  };
});

export const BorderButton = styled(BaseButton)<BaseButtonProps>(
  ({ theme, color = 'primary' }) => {
    return {
      border: `1px solid ${theme.colors[COLORS[color] + '200']}`,

      '&:hover': {
        background: `${theme.colors[COLORS[color] + '100']}`,
      },
    };
  },
);

export const ContainedButton = styled(BaseButton)<BaseButtonProps>(
  ({ theme, color = 'primary' }) => {
    return {
      background: `${theme.colors[COLORS[color] + '200']}`,

      '&:hover': {
        background: `${theme.colors[COLORS[color] + '300']}`,
      },
    };
  },
);
