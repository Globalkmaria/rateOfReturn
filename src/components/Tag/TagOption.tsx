import styled from 'styled-components';

import useModal from '@/views/List/hooks/useModal';
import DeleteWarningModal from '../DeleteWarningModal';
import Icon from '../Icon';
import { StyledChip, StyledChipText } from '.';

interface OptionProps {
  onOptionClick: (option: string) => void;
  onDeleteOption: (option: string) => void;
  option: string;
  width: number;
}
function TagOption({
  option,
  onOptionClick,
  onDeleteOption,
  width,
}: OptionProps) {
  const { onOpenModal, onCloseModal, showModal } = useModal();

  const onDelete = () => {
    onDeleteOption(option);
    onCloseModal();
  };
  return (
    <>
      <StyledOption>
        <StyledOptionButton
          title={option}
          key={option}
          onClick={() => {
            onOptionClick(option);
          }}
        >
          <StyledChip>
            <StyledChipText width={width - 60}>{option}</StyledChipText>
          </StyledChip>
        </StyledOptionButton>
        <StyledDeleteButton onClick={onOpenModal}>
          <Icon icon='delete' size='xs' color='grey600' />
        </StyledDeleteButton>
      </StyledOption>
      {showModal && (
        <DeleteWarningModal
          message={`Are you sure you want to delete this tag?`}
          onClose={onCloseModal}
          onDelete={onDelete}
        />
      )}
    </>
  );
}

export default TagOption;

const StyledOptionButton = styled.button.attrs({ type: 'button' })`
  width: 100%;
`;

const StyledDeleteButton = styled.button.attrs({ type: 'button' })`
  opacity: 0;
  padding: 5px;
  border-radius: 5px;

  &:hover {
    background: ${({ theme }) => theme.colors.grey300};
  }
`;

const StyledOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;

  border-radius: 5px;

  &:hover {
    background: ${({ theme }) => theme.colors.grey100};

    ${StyledDeleteButton} {
      opacity: 1;
    }
  }

  &:focus {
    background: ${({ theme }) => theme.colors.grey100};
  }
`;
