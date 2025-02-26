import styled from 'styled-components';

import { ColorsTypes } from '@/styles/theme';

import { BaseButton } from './BaseButton';
import { BUTTON_COLORS } from './const';
import { getHoverColor } from './helper';
import { BackgroundButtonProps } from './type';

export const BackgroundButton = styled(BaseButton).withConfig({
  shouldForwardProp: prop =>
    !['hoverDarker', 'showLine'].includes(prop as string),
})<BackgroundButtonProps>(({ theme, color = 'primary', hoverDarker = 0 }) => ({
  '&:not([disabled]):hover': {
    background:
      theme.colors[
        (BUTTON_COLORS[color] + getHoverColor(hoverDarker)) as keyof ColorsTypes
      ],
  },
}));
