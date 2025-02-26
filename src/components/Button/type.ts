import { ButtonHTMLAttributes } from 'react';

export const BUTTON_SIZES = ['s', 'm', 'l'] as const;
export type ButtonSizeKeys = (typeof BUTTON_SIZES)[number];

export const BUTTON_COLOR_KEYS = [
  'primary',
  'secondary1',
  'secondary2',
  'warning',
  'primary2',
] as const;
export type ButtonColorKeys = (typeof BUTTON_COLOR_KEYS)[number];

export type ButtonSizes = { [K in ButtonSizeKeys]: string };

export type ButtonColors = { [K in ButtonColorKeys]: string };

export interface BaseButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSizeKeys;
  color?: ButtonColorKeys;
  height?: number;
  width?: number;
  fullWidth?: boolean;
}

export interface BorderButtonProps extends BaseButtonProps {
  showLine?: boolean;
}

export type ButtonHoverDarker = 0 | 1 | 2 | 3 | 4;

export interface BackgroundButtonProps extends BaseButtonProps {
  hoverDarker?: ButtonHoverDarker;
}

export interface ContainedButtonProps extends BaseButtonProps {
  mode?: 'light' | 'dark';
}
