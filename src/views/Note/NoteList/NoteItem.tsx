import { MouseEventHandler, memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import userNotesService from '@/service/userNotes/service';

import { Chip, ChipText } from '@/components/Chip';
import Flex from '@/components/Flex';
import IconButton from '@/components/IconButton';

import { selectIsLoggedIn } from '@/features/user/selectors';
import { deleteNote, selectNoteItem } from '@/features/notes';

import { shortenText } from '@/utils/text';
import { isDefined } from '@/utils/validation';

import { formatNoteDate } from './helper';
import { StyledDate, StyledDateIcon } from './components';

interface NoteItemProps {
  id: string;
  onNoteClick: (id: string) => void;
}

function NoteItem({ id, onNoteClick }: NoteItemProps) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const onDelete: MouseEventHandler<HTMLButtonElement> = async e => {
    e.stopPropagation();
    if (isDeleting) return;

    if (isLoggedIn) {
      setIsDeleting(true);
      const result = await userNotesService.deleteNote(id);
      setIsDeleting(false);

      if (!result.success) {
        alert(result.message);
        return;
      }
    }

    dispatch(deleteNote(id));
  };

  return (
    <StyledNoteItem data-testid='note-item' onClick={() => onNoteClick(id)}>
      <StyledHeader justifyContent='space-between' alignItems='center'>
        <StyledTitle>{shortedTitle}</StyledTitle>
        <IconButton icon='delete' onClick={onDelete} />
      </StyledHeader>
      <StyledText>{shortenedText}</StyledText>
      <StyledChipContainer gap={5} flexWrap='wrap'>
        {isDefined(stockName) && (
          <Chip data-testid='stock-name__chip' color='red100'>
            <ChipText color='red700'>{stockName}</ChipText>
          </Chip>
        )}
        {isDefined(purchasedId) && (
          <Chip color='blue100' data-testid='purchased-id__chip'>
            <ChipText color='blue700'>{`#${purchasedId}`}</ChipText>
          </Chip>
        )}
        {isDefined(soldId) && (
          <Chip data-testid='sold-id__chip' color='indigo100'>
            <ChipText color='indigo700'>{`#${soldId}`}</ChipText>
          </Chip>
        )}
        {isDefined(tag) && (
          <Chip data-testid='tag__chip' color='brown100'>
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

export default memo(NoteItem);

const StyledNoteItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: 100%;
  border-radius: 13px;
  box-shadow: rgba(50, 50, 50, 0.3) 0px 8px 20px;
  font-size: 0.8rem;
  transition: transform 0.3s;

  .icon-button path {
    color: ${({ theme }) => theme.colors.white};
  }

  &:hover {
    transform: translateY(-10px);
  }

  &:hover .icon-button path {
    color: ${({ theme }) => theme.colors.grey900};
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

const StyledChipContainer = styled(Flex)`
  flex: 1;

  ${Chip} {
    height: 25px;
  }
`;

const StyledDateContainer = styled(Flex)`
  margin-top: 12px;
`;
