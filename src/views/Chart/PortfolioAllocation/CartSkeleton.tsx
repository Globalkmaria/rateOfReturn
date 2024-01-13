import styled from 'styled-components';

const CartSkeleton = () => {
  return (
    <StyledSkeleton>
      <Skeleton />
    </StyledSkeleton>
  );
};

export default CartSkeleton;

const StyledSkeleton = styled('div')`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Skeleton = styled('div')`
  position: relative;
  aspect-ratio: 1 / 1;
  width: 30%;
  border-radius: 50%;
  border: 70px solid rgba(200, 200, 200, 0.3);
  border-top-color: rgba(200, 200, 200, 0.6);
  animation: rotateSkeleton 1500ms linear infinite;

  @keyframes rotateSkeleton {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
