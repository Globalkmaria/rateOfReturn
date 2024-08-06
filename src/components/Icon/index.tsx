import styled from 'styled-components';
import { ICONS, IconButtonType } from './const';
import { DefaultTheme } from 'styled-components/dist/types';

const SIZES = ['xs', 's', 'm', 'l'] as const;
type Sizes = { [key in (typeof SIZES)[number]]: string };

const FONT_SIZES: Sizes = {
  xs: '0.8rem',
  s: '1rem',
  m: '1.2rem',
  l: '1.4rem',
};

interface IconStyleProps {
  size?: keyof Sizes;
  color?: keyof DefaultTheme['colors'];
  disabled?: boolean;
}

export interface IconProps extends IconStyleProps {
  icon: IconButtonType;
  className?: string;
}

function Icon({ size = 's', icon, color, disabled, className }: IconProps) {
  return (
    <Container
      className={`icon ${className}`}
      color={color}
      size={size}
      disabled={disabled}
    >
      {ICONS[icon]}
    </Container>
  );
}

export default Icon;

const Container = styled('div')<IconStyleProps>(
  ({ theme, color, size = 's', disabled }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: FONT_SIZES[size],
    height: FONT_SIZES[size],
    fontSize: FONT_SIZES[size],
    color: getColor(theme, color, disabled),

    svg: {
      color: getColor(theme, color, disabled),

      path: {
        color: getColor(theme, color, disabled),
      },

      line: {
        color: getColor(theme, color, disabled),
      },
    },
  }),
);

const getColor = (
  theme: DefaultTheme,
  color?: keyof DefaultTheme['colors'],
  disabled?: boolean,
) => {
  if (disabled) {
    return theme.colors.grey500;
  }
  return color ? theme.colors[color] : theme.colors.black;
};
