import styled from 'styled-components';

import {
  BUTTON_HEIGHTS,
  BackgroundButton,
  BackgroundButtonProps,
} from '../Button';
import Icon from '../Icon';
import { ICON_TITLES, IconButtonType } from '../Icon/const';

type IconButtonProps = {
  icon: IconButtonType;
} & BackgroundButtonProps;

function IconButton({ icon, color, ...resProps }: IconButtonProps) {
  return (
    <StyledIconButton
      className='icon-button'
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

const _SIZES = ['s', 'm', 'l'] as const;
type Sizes = { [key in (typeof _SIZES)[number]]: string };

const FONT_SIZES: Sizes = {
  s: '1rem',
  m: '1.2rem',
  l: '1.4rem',
};
