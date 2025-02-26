import styled from 'styled-components';

import {
  BUTTON_FONT_SIZES,
  BUTTON_HEIGHTS,
  BUTTON_PADDING_SIZES,
} from './const';
import { BaseButtonProps } from './type';

export const BaseButton = styled('button')
  .withConfig({
    shouldForwardProp: props =>
      ![
        'size',
        'color',
        'height',
        'width',
        'fullWidth',
        'disableIcon',
      ].includes(props),
  })
  .attrs(props => ({
    type: props.type || 'button',
  }))<BaseButtonProps>(({ theme, height, width, fullWidth, size = 's' }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  padding: `0px ${BUTTON_PADDING_SIZES[size]}`,
  height: height ? `${height}px` : BUTTON_HEIGHTS[size],
  width: width ? `${width}px` : fullWidth ? '100%' : 'auto',
  transition: '100ms',
  borderRadius: '12px',

  fontSize: `min(${BUTTON_FONT_SIZES[size]}, 5vw)`,
  whiteSpace: 'nowrap',
  fontWeight: 500,

  '&:disabled': {
    color: theme.colors.grey500,
    cursor: 'not-allowed',
  },

  [`@media ${theme.devices.mobile}`]: {
    fontSize: 'min(0.8rem, 5vw)',
  },
}));
