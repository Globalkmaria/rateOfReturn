import styled from 'styled-components';

import { Chip, ChipText } from '@/components/Chip';
import Flex from '@/components/Flex';
import Icon, { IconProps } from '@/components/Icon';

import { shortenText } from '@/utils/text';

function NoteItem() {
  const stockName = 'SPDR S&P 500';
  const title =
    'Something about collapses Something about collapses Something about collapses Something about col';
  const text =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec turpis in velit gravida congue. Vestibulum nec ipsum non mi facilisis rutrum. Vestibulum sit amet neque id';
  const purchasedId = '12345';
  const soldId = '67890';
  const createdAt = '23-06-15';
  const updatedAt = '23-06-16';

  const shortedTitle = shortenText(title, 30);
  const shortenedText = shortenText(text, 100);

  return (
    <StyledNoteItem>
      <StyledHeader justifyContent='space-between' alignItems='center'>
        <StyledTitle>{shortedTitle}</StyledTitle>
        <StyledIconButton>
          <Icon icon='moreHorizontal' color='grey500' size='l' />
        </StyledIconButton>
      </StyledHeader>
      <StyledText>{shortenedText}</StyledText>

      <Flex gap={5}>
        <Chip color='red100'>
          <ChipText color='red700'>{stockName}</ChipText>
        </Chip>
        <Chip color='blue100'>
          <ChipText color='blue700'>{`#${purchasedId}`}</ChipText>
        </Chip>
        <Chip color='indigo100'>
          <ChipText color='indigo700'>{`#${soldId}`}</ChipText>
        </Chip>
      </Flex>

      <StyledDateContainer gap={5} justifyContent='space-between'>
        <StyledDate>
          <StyledDateIcon />
          {createdAt}
        </StyledDate>
        <StyledDate>
          <StyledDateIcon />
          {updatedAt}
        </StyledDate>
      </StyledDateContainer>
    </StyledNoteItem>
  );
}

export default NoteItem;

const StyledNoteItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 13px;
  box-shadow: rgba(50, 50, 50, 0.3) 0px 8px 20px;
  font-size: 0.8rem;
  width: 300px;
`;

const StyledHeader = styled(Flex)`
  margin-bottom: 8px;
`;

const StyledTitle = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledText = styled.p`
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.grey600};
  line-height: 1.2;
  height: 50px;
`;

const StyledDate = styled.span`
  display: flex;
  gap: 5px;
  color: ${({ theme }) => theme.colors.grey700};
`;

const StyledDateContainer = styled(Flex)`
  margin-top: 12px;
`;

const StyledIconButton = styled.button.attrs({ type: 'button' })`
  .icon {
    font-size: 1.6rem;
  }

  &:hover path {
    color: ${({ theme }) => theme.colors.grey900};
  }
`;

const StyledDateIcon = styled(Icon).attrs<Partial<IconProps>>({
  icon: 'calendar',
  color: 'grey700',
})``;
