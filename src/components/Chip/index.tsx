import { ColorsKeys } from '@/styles/theme';
import styled from 'styled-components';

interface ChipProps {
  color?: ColorsKeys;
  width?: number;
}

export const Chip = styled.div<Pick<ChipProps, 'color'>>`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px;
  width: fit-content;
  max-width: 100%;
  background: ${({ theme, color }) =>
    color ? theme.colors[color] : theme.colors.grey300};
  border-radius: 5px;
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
