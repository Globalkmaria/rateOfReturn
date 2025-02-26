import { Link } from 'react-router-dom';

import styled, { css, DefaultTheme } from 'styled-components';

import { RequiredPick } from '@/type';

import { BackgroundButton, ButtonColorKeys } from '../Button';
import { BaseAnchor } from './BaseAnchor';
import { anchorShouldForwardProp } from './helper';
import { BaseAnchorProps } from './type';

export const BackgroundAnchor = styled(BackgroundButton)
  .withConfig({
    shouldForwardProp: anchorShouldForwardProp,
  })
  .attrs<BaseAnchorProps>(props => ({
    as: props.disabled ? 'span' : Link,
  }))`
  ${BaseAnchor} 

  color: ${({ theme, selected }) => (selected ? theme.colors.black : theme.colors.grey600)};
  font-weight: ${({ selected }) => (selected ? 500 : 300)};

  &&:hover {
    color: ${({ theme }) => theme.colors.black};
    ${({ theme, color = 'primary', selected = false }) => styles[color]({ theme, selected })}
  }
`;

type StyledProps = {
  theme: DefaultTheme;
} & RequiredPick<BaseAnchorProps, 'selected'>;

const primaryStyle = ({ theme, selected }: StyledProps) => css`
  background: ${selected ? 'none' : theme.colors.grey100};
`;

const primary2Style = ({ theme, selected }: StyledProps) => css`
  background: ${selected ? 'none' : theme.colors.white};
`;

const secondary1Style = ({ theme, selected }: StyledProps) => css`
  background: ${selected ? 'none' : theme.colors.indigo100};
`;

const secondary2Style = ({ theme, selected }: StyledProps) => css`
  background: ${selected ? 'none' : theme.colors.violet100};
`;

const warningStyle = ({ theme, selected }: StyledProps) => css`
  background: ${selected ? 'none' : theme.colors.red100};
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
