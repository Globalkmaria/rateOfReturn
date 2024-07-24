import styled from 'styled-components';

import { BUTTON_HEIGHTS, BackgroundButton, BorderButtonProps } from '../Button';
import { ICON_TITLES, IconButtonType } from '../Icon/const';
import Icon from '../Icon';

type IconButtonProps = {
  icon: IconButtonType;
} & BorderButtonProps;

function IconButton({
  icon,
  disabled,
  width = 40,
  color,
  ...resProps
}: IconButtonProps) {
  return (
    <StyledContainer
      disabled={disabled}
      width={width}
      aria-label={ICON_TITLES[icon]}
      title={ICON_TITLES[icon]}
      color={color}
      {...resProps}
    >
      <Icon icon={icon} {...resProps} />
    </StyledContainer>
  );
}

export default IconButton;

const StyledContainer = styled(BackgroundButton)(
  ({ height, disabled, theme, size = 's' }) => ({
    width: height ? `${height}px` : BUTTON_HEIGHTS[size],

    svg: {
      color: disabled ? theme.colors.grey500 : '',
      fill: disabled ? theme.colors.grey500 : '',

      path: {
        color: disabled ? theme.colors.grey500 : '',
      },
    },
  }),
);
