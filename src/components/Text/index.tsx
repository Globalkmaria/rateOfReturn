import styled from 'styled-components';

export const Ellipsis = styled.p<{
  width?: number | string;
}>`
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const NoListText = styled.span`
  font-weight: 500;
`;
