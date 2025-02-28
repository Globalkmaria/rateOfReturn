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
