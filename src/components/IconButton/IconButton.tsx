import styled from 'styled-components';

import { BUTTON_HEIGHTS, BackgroundButton, BorderButtonProps } from '../Button';
import { ICON_TITLES, IconButtonType } from '../Icon/const';
import Icon from '../Icon';

type IconButtonProps = {
  icon: IconButtonType;
} & BorderButtonProps;

function IconButton({ icon, color, ...resProps }: IconButtonProps) {
  return (
    <StyledIconButton
      aria-label={ICON_TITLES[icon]}
      title={ICON_TITLES[icon]}
      color={color}
      {...resProps}
    >
      <Icon icon={icon} {...resProps} />
    </StyledIconButton>
  );
}

export default IconButton;

export const StyledIconButton = styled(BackgroundButton)(
  ({ height, size = 's', disabled }) => ({
    width: height ? `${height}px` : BUTTON_HEIGHTS[size],
    cursor: disabled ? 'not-allowed' : 'pointer',

    svg: {
      fontSize: FONT_SIZES[size],
    },
  }),
);

const SIZES = ['s', 'm', 'l'] as const;
type Sizes = { [key in (typeof SIZES)[number]]: string };

const FONT_SIZES: Sizes = {
  s: '1rem',
  m: '1.2rem',
  l: '1.4rem',
};
