import styled from 'styled-components/macro';

const Loading = () => {
  return <StyledLoading></StyledLoading>;
};

export default Loading;

const StyledLoading = styled('div')`
  min-height: calc(100vh - 100px);
  background-color: ${({ theme }) => theme.colors.greyBackground};
`;
