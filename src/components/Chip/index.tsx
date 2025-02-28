import styled from 'styled-components';

import { ColorsKeys } from '@/styles/theme';

export interface ChipProps {
  color?: ColorsKeys;
  width?: number;
  fontColor?: ColorsKeys;
}

export const Chip = styled.div.withConfig({
  shouldForwardProp: prop => !['fontColor'].includes(prop),
})<Pick<ChipProps, 'color' | 'fontColor'>>`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px;
  width: fit-content;
  max-width: 100%;
  background: ${({ theme, color }) =>
    color ? theme.colors[color] : theme.colors.grey300};
  border-radius: 5px;
  color: ${({ theme, fontColor }) => theme.colors[fontColor || 'black']};
`;

export const ChipText = styled.span.withConfig({
  shouldForwardProp: prop => !['width'].includes(prop),
})<ChipProps>`
  max-width: ${({ width }) => width}px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme, color }) =>
    color ? theme.colors[color] : theme.colors.black};
`;
