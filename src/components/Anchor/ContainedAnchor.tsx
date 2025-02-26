import { Link } from 'react-router-dom';

import styled, { css } from 'styled-components';
import { DefaultTheme } from 'styled-components';

import { RequiredPick } from '@/type';

import { ButtonColorKeys, ContainedButton } from '../Button';
import { BaseAnchor } from './BaseAnchor';
import { anchorShouldForwardProp } from './helper';
import { BaseAnchorProps, ContainedAnchorProps } from './type';

export const ContainedAnchor = styled(ContainedButton)
  .withConfig({
    shouldForwardProp: anchorShouldForwardProp,
  })
  .attrs<BaseAnchorProps>(props => ({
    as: props.disabled ? 'span' : Link,
  }))`
${BaseAnchor} 
${({ theme, selected = false, mode = 'dark', color = 'primary' }) =>
  styles[color]({ theme, selected, mode })};
`;

type StyledProps = {
  theme: DefaultTheme;
} & RequiredPick<ContainedAnchorProps, 'mode' | 'selected'>;

const primaryStyle = ({ theme, selected, mode }: StyledProps) => css`
  background: ${selected
    ? mode === 'dark'
      ? theme.colors.grey800
      : theme.colors.grey100
    : ''};
`;

const primary2Style = ({ theme, selected }: StyledProps) => css`
  background: ${selected ? theme.colors.grey100 : ''};
`;

const secondary1Style = ({ theme, selected, mode }: StyledProps) => css`
  background: ${selected
    ? mode === 'dark'
      ? theme.colors.indigo800
      : theme.colors.indigo100
    : ''};
`;

const secondary2Style = ({ theme, selected, mode }: StyledProps) => css`
  background: ${selected
    ? mode === 'dark'
      ? theme.colors.violet800
      : theme.colors.violet100
    : ''};
`;

const warningStyle = ({ theme, selected, mode }: StyledProps) => css`
  background: ${selected
    ? mode === 'dark'
      ? theme.colors.red800
      : theme.colors.red100
    : ''};
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
