import styled from 'styled-components';

import { BUTTON_HEIGHTS, BorderButton, BorderButtonProps } from '../Button';
import { ICONS, ICON_TITLES, IconButtonType } from './const';

type IconButtonProps = {
  icon: IconButtonType;
} & BorderButtonProps;

function IconButton({
  icon,
  disabled,
  width = 40,
  ...resProps
}: IconButtonProps) {
  return (
    <StyledContainer
      disabled={disabled}
      width={width}
      aria-label={ICON_TITLES[icon]}
      title={ICON_TITLES[icon]}
      {...resProps}
    >
      {ICONS[icon]}
    </StyledContainer>
  );
}

export default IconButton;

const StyledContainer = styled(BorderButton)`
  width: ${({ height, size = 's' }) =>
    height ? `${height}px` : BUTTON_HEIGHTS[size]};
`;
