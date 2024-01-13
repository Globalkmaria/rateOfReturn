import { ChangeEvent, InputHTMLAttributes } from 'react';
import styled from 'styled-components';

export type OnInputChangeType = (e: ChangeEvent<HTMLInputElement>, transformedValue: TransformedValue) => void;
export type TransformedValue = [localValue: string, pureValue: string] | null;

export const INPUT_TYPES = ['text', 'number', 'date', 'time'] as const;
interface BaseInputProps {
  align?: 'left' | 'right';
  fullWidth?: boolean;
  padding?: number;
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onBlur'>, BaseInputProps {
  type?: (typeof INPUT_TYPES)[number];
  value?: string;
  onChange?: OnInputChangeType;
  onBlur?: OnInputChangeType;
}

export const BaseInput = styled('input').withConfig({
  shouldForwardProp: prop => !['align', 'fullWidth', 'padding'].includes(prop),
})<BaseInputProps>(({ theme, align = 'left', width, fullWidth, padding = 5 }) => ({
  padding: `${padding}px`,
  border: 'none',
  borderRadius: '5px',
  textAlign: align,
  fontSize: '1rem',
  width: width ? `${width}px` : fullWidth ? '100%' : 'auto',

  '&:focus': {
    background: theme.colors.grey000,
  },
}));
