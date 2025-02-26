import styled, { css, DefaultTheme } from 'styled-components';

import { RequiredPick } from '@/type';

import { BaseButton } from './BaseButton';
import { ButtonColorKeys, ContainedButtonProps } from './type';

export const ContainedButton = styled(BaseButton).withConfig({
  shouldForwardProp: props => !['showLine'].includes(props),
})<ContainedButtonProps>`
  color: ${({ mode = 'dark', theme }) =>
    mode === 'dark' ? theme.colors.white : theme.colors.grey900};
  ${({ color = 'primary', mode = 'dark', disabled = false, theme }) =>
    styles[color]({ mode, disabled, theme })};
`;

type StyledProps = RequiredPick<ContainedButtonProps, 'mode' | 'disabled'> & {
  theme: DefaultTheme;
};

const primaryStyle = ({ mode, disabled, theme }: StyledProps) => css`
  background: ${disabled
    ? theme.colors.grey000
    : mode === 'dark'
      ? theme.colors.grey800
      : theme.colors.grey100};

  &:not([disabled]):hover {
    background: ${mode === 'dark'
      ? theme.colors.grey600
      : theme.colors.grey300};
  }
`;

const primary2Style = ({ disabled, theme }: StyledProps) => css`
  background: ${disabled ? theme.colors.grey000 : theme.colors.white};

  &:not([disabled]):hover {
    background: ${theme.colors.grey100};
  }
`;

const secondary1Style = ({ mode, disabled, theme }: StyledProps) => css`
  background: ${disabled
    ? theme.colors.grey000
    : mode === 'dark'
      ? theme.colors.indigo800
      : theme.colors.indigo100};

  &:not([disabled]):hover {
    background: ${mode === 'dark'
      ? theme.colors.indigo600
      : theme.colors.indigo300};
  }
`;

const secondary2Style = ({ mode, disabled, theme }: StyledProps) => css`
  background: ${disabled
    ? theme.colors.grey000
    : mode === 'dark'
      ? theme.colors.violet800
      : theme.colors.violet100};

  &:not([disabled]):hover {
    background: ${mode === 'dark'
      ? theme.colors.violet600
      : theme.colors.violet300};
  }
`;

const warningStyle = ({ mode, disabled, theme }: StyledProps) => css`
  background: ${disabled
    ? theme.colors.grey000
    : mode === 'dark'
      ? theme.colors.red800
      : theme.colors.red100};

  &:not([disabled]):hover {
    background: ${mode === 'dark' ? theme.colors.red600 : theme.colors.red300};
  }
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
