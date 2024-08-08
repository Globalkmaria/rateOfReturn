import styled from 'styled-components';

import { Chip, ChipText } from '@/components/Chip';
import Flex from '@/components/Flex';
import Icon from '@/components/Icon';

import { shortenText } from '@/utils/text';
import { useSelector } from 'react-redux';
import { selectNoteItem } from '@/features/notes';
import { checkNullish } from '@/utils/validation';
import { formatNoteDate } from './helper';
import { StyledDate, StyledDateIcon } from './components';

interface NoteItemProps {
  id: string;
}

function NoteItem({ id }: NoteItemProps) {
  const {
    title,
    text,
    createdAt,
    updatedAt,
    purchasedId,
    soldId,
    tag,
    stockName,
  } = useSelector(selectNoteItem(id));

  const formattedCreatedAt = formatNoteDate(createdAt);
  const formattedUpdatedAt = formatNoteDate(updatedAt);

  const shortedTitle = shortenText(title, 30);
  const shortenedText = shortenText(text ?? '', 100);

  return (
    <StyledNoteItem>
      <StyledHeader justifyContent='space-between' alignItems='center'>
        <StyledTitle>{shortedTitle}</StyledTitle>
        <StyledIconButton>
          <Icon icon='moreHorizontal' color='grey500' size='l' />
        </StyledIconButton>
      </StyledHeader>
      <StyledText>{shortenedText}</StyledText>
      <StyledChipContainer gap={5} flexWrap='wrap'>
        {!checkNullish(stockName) && (
          <Chip color='red100'>
            <ChipText color='red700'>{stockName}</ChipText>
          </Chip>
        )}
        {!checkNullish(purchasedId) && (
          <Chip color='blue100'>
            <ChipText color='blue700'>{`#${purchasedId}`}</ChipText>
          </Chip>
        )}
        {!checkNullish(soldId) && (
          <Chip color='indigo100'>
            <ChipText color='indigo700'>{`#${soldId}`}</ChipText>
          </Chip>
        )}
        {!checkNullish(tag) && (
          <Chip color='brown100'>
            <ChipText color='brown700'>{`${tag}`}</ChipText>
          </Chip>
        )}
      </StyledChipContainer>

      <StyledDateContainer gap={5} justifyContent='space-between'>
        <StyledDate>
          <StyledDateIcon />
          {formattedCreatedAt}
        </StyledDate>
        <StyledDate>
          <StyledDateIcon />
          {formattedUpdatedAt}
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
  height: 100%;
  border-radius: 13px;
  box-shadow: rgba(50, 50, 50, 0.3) 0px 8px 20px;
  font-size: 0.8rem;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-10px);
  }
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
  height: 48px;
  color: ${({ theme }) => theme.colors.grey600};
  line-height: 1.2;
  word-break: break-word;
`;

const StyledIconButton = styled.button.attrs({ type: 'button' })`
  .icon {
    font-size: 1.6rem;
  }

  &:hover path {
    color: ${({ theme }) => theme.colors.grey900};
  }
`;

const StyledChipContainer = styled(Flex)`
  flex: 1;

  ${Chip} {
    height: 25px;
  }
`;

const StyledDateContainer = styled(Flex)`
  margin-top: 12px;
`;
