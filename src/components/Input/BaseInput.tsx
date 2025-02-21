import { ChangeEvent, InputHTMLAttributes, Ref } from 'react';

import styled from 'styled-components';

export type OnInputChangeType = (
  e: ChangeEvent<HTMLInputElement>,
  transformedValue: TransformedValue,
) => void;
export type TransformedValue =
  | [value: string, numValue: number]
  | string
  | null;

export const INPUT_TYPES = [
  'text',
  'decimal',
  'number',
  'date',
  'time',
] as const;

export type InputType = (typeof INPUT_TYPES)[number];

interface BaseInputProps {
  align?: 'left' | 'right';
  fullWidth?: boolean;
  padding?: number;
}

export type InputValidation<T> = (value: T) => boolean;

export interface InputProps<T>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onBlur'>,
    BaseInputProps {
  type?: InputType;
  value?: string;
  onChange?: OnInputChangeType;
  onBlur?: OnInputChangeType;
  validation?: InputValidation<T>;
  ref?: Ref<HTMLInputElement>;
}

export const BaseInput = styled('input').withConfig({
  shouldForwardProp: prop => !['align', 'fullWidth', 'padding'].includes(prop),
})<BaseInputProps>(
  ({ theme, align = 'left', width, fullWidth, padding = 5 }) => ({
    padding: `${padding}px`,
    border: 'none',
    borderRadius: '5px',
    textAlign: align,
    fontSize: 'inherit',
    width: width ? `${width}px` : fullWidth ? '100%' : 'auto',

    '&:focus': {
      background: theme.colors.grey000,
    },
  }),
);
