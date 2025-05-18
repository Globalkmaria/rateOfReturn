import styled from 'styled-components';

export const Skeleton = styled('div')`
  background: linear-gradient(
    120deg,
    #e5e5e5 30%,
    #f0f0f0 38%,
    #f0f0f0 40%,
    #e5e5e5 48%
  );
  background-size: 200% 100%;
  background-position: 100% 0;
  animation: load 2.5s infinite;

  @keyframes load {
    100% {
      background-position: -100% 0;
    }
  }
`;

interface Skeleton2Props {
  width?: string;
  height?: string;
  borderRadius?: string;
  margin?: string;
}

export const Skeleton2 = styled(Skeleton)<Skeleton2Props>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '100%'};
  border-radius: ${({ borderRadius }) =>
    borderRadius ? getBorderRadius(borderRadius as BorderRadius) : '0'};
  margin: ${({ margin }) => margin || '0'};
`;

type BorderRadius = 's' | 'm';
const borderRadiusValues = {
  s: '5px',
  m: '10px',
};
const getBorderRadius = (borderRadius: BorderRadius) => {
  return borderRadiusValues[borderRadius] || borderRadius;
};
