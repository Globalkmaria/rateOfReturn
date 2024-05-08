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
}

interface IconProps extends IconStyleProps {
  icon: IconButtonType;
}

function Icon({ size = 's', icon, color }: IconProps) {
  return (
    <Container color={color} size={size}>
      {ICONS[icon]}
    </Container>
  );
}

export default Icon;

const Container = styled('div')<IconStyleProps>(
  ({ theme, color, size = 's' }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: FONT_SIZES[size],
    height: FONT_SIZES[size],
    fontSize: FONT_SIZES[size],

    svg: {
      color: color ? theme.colors[color] : theme.colors.grey800,
      fill: color ? theme.colors[color] : theme.colors.grey800,

      path: {
        color: color ? theme.colors[color] : theme.colors.grey800,
      },
    },
  }),
);
