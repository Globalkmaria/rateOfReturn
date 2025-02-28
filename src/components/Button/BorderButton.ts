import styled, { css, DefaultTheme } from 'styled-components';

import { ColorsKeys } from '@/styles/theme';
import { RequiredPick } from '@/type';

import { BaseButton } from './BaseButton';
import { BUTTON_COLORS } from './const';
import { BorderButtonProps, ButtonColorKeys } from './type';

export const BorderButton = styled(BaseButton).withConfig({
  shouldForwardProp: props => !['showLine'].includes(props),
})<BorderButtonProps>`
  border-color: ${({ theme, showLine, color = 'primary' }) =>
    showLine ? theme.colors[(BUTTON_COLORS[color] + '300') as ColorsKeys] : ''};

  span: {
    color: 'inherit';
  }

  &:not([disabled]):hover {
    background: ${({ theme }) => theme.colors.grey100};
  }

  ${({ color = 'primary', showLine = true, theme }) =>
    styles[color]({ showLine, theme })};
`;

type StyledProps = RequiredPick<BorderButtonProps, 'showLine'> & {
  theme: DefaultTheme;
};

const primaryStyle = ({ showLine, theme }: StyledProps) => css`
  border: ${showLine ? '1px solid' : 'none'} ${theme.colors.grey300};

  &:not([disabled]):hover {
    border: ${showLine ? '1px solid' : 'none'} ${theme.colors.grey900};
  }
`;

const secondary1Style = ({ showLine, theme }: StyledProps) => css`
  border: ${showLine ? '1px solid' : 'none'} ${theme.colors.indigo300};

  &:not([disabled]):hover {
    border: ${showLine ? '1px solid' : 'none'} ${theme.colors.indigo900};
  }
`;

const secondary2Style = ({ showLine, theme }: StyledProps) => css`
  border: ${showLine ? '1px solid' : 'none'} ${theme.colors.violet300};

  &:not([disabled]):hover {
    border: ${showLine ? '1px solid' : 'none'} ${theme.colors.violet900};
  }
`;

const warningStyle = ({ showLine, theme }: StyledProps) => css`
  border: ${showLine ? '1px solid' : 'none'} ${theme.colors.red300};

  &:not([disabled]):hover {
    border: ${showLine ? '1px solid' : 'none'} ${theme.colors.red900};
  }
`;

const styles: Record<
  ButtonColorKeys,
  (props: StyledProps) => ReturnType<typeof css>
> = {
  primary: primaryStyle,
  primary2: primaryStyle,
  secondary1: secondary1Style,
  secondary2: secondary2Style,
  warning: warningStyle,
};
