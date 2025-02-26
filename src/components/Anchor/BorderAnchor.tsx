import { Link } from 'react-router-dom';

import styled, { css, DefaultTheme } from 'styled-components';

import { RequiredPick } from '@/type';

import { BorderButton, ButtonColorKeys } from '../Button';
import { BaseAnchor } from './BaseAnchor';
import { anchorShouldForwardProp } from './helper';
import { BaseAnchorProps } from './type';

export const BorderAnchor = styled(BorderButton)
  .withConfig({
    shouldForwardProp: anchorShouldForwardProp,
  })
  .attrs<BaseAnchorProps>(props => ({
    as: props.disabled ? 'span' : Link,
  }))`
  ${BaseAnchor} 
  ${({ theme, selected = false, color = 'primary' }) => styles[color]({ theme, selected })}
`;

type StyledProps = {
  theme: DefaultTheme;
} & RequiredPick<BaseAnchorProps, 'selected'>;

const primaryStyle = ({ theme, selected }: StyledProps) => css`
  background: ${selected ? theme.colors.grey100 : ''};
`;

const primary2Style = ({ theme, selected }: StyledProps) => css`
  background: ${selected ? theme.colors.white : ''};
`;

const secondary1Style = ({ theme, selected }: StyledProps) => css`
  background: ${selected ? theme.colors.indigo100 : ''};
`;

const secondary2Style = ({ theme, selected }: StyledProps) => css`
  background: ${selected ? theme.colors.violet100 : ''};
`;

const warningStyle = ({ theme, selected }: StyledProps) => css`
  background: ${selected ? theme.colors.red100 : ''};
`;

const styles: Record<
  ButtonColorKeys,
  (props: StyledProps) => ReturnType<typeof css>
> = {
  primary: primaryStyle,
  primary2: primary2Style,
  secondary1: secondary1Style,
  secondary2: secondary2Style,
  warning: warningStyle,
};
