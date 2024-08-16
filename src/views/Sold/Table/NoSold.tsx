import { BorderAnchor } from '@/components/Anchor';
import Flex from '@/components/Flex';
import { NoListText } from '@/components/Text';
import styled from 'styled-components';

function NoSold() {
  return (
    <NoSoldContainer>
      <NoListText>No solds</NoListText>
      <Flex gap={10} justifyContent='center' alignItems='center'>
        Please add sold from
        <BorderAnchor to={'/portfolio'}>Current Portfolio</BorderAnchor>
      </Flex>
    </NoSoldContainer>
  );
}

export default NoSold;

export const NoSoldContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > ${Flex} {
    margin-top: 15px;
  }
`;
