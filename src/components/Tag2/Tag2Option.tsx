import styled from 'styled-components';

import useModal from '@/views/List/hooks/useModal';
import DeleteWarningModal from '../DeleteWarningModal';
import Icon from '../Icon';
import { Chip, ChipText } from '../Chip';
import { ColorsKeys } from '@/styles/theme';

export interface TagOption {
  label: string;
  value: string;
}
export type Tag2OptionType = string | TagOption;

export interface Tag2OptionProps<T extends Tag2OptionType> {
  onOptionClick: (option: T) => void;
  onDeleteOption?: (option: T) => void;
  option: T;
  width: number;
  showDeleteItem?: boolean;
  chipColor: ColorsKeys;
  chipTextColor: ColorsKeys;
}

function Tag2Option<T extends Tag2OptionType>({
  option,
  width,
  onOptionClick,
  onDeleteOption,
  showDeleteItem = false,
  chipColor,
  chipTextColor,
}: Tag2OptionProps<T>) {
  const { onOpenModal, onCloseModal, showModal } = useModal();

  const onDelete = () => {
    if (onDeleteOption) onDeleteOption(option);
    onCloseModal();
  };
  const label = typeof option === 'string' ? option : option.label;
  return (
    <>
      <StyledOption>
        <StyledOptionButton
          title={label}
          onClick={() => {
            onOptionClick(option);
          }}
        >
          <Chip color={chipColor}>
            <ChipText color={chipTextColor} width={width - 60}>
              {label}
            </ChipText>
          </Chip>
        </StyledOptionButton>
        {showDeleteItem && (
          <StyledDeleteButton onClick={onOpenModal}>
            <Icon icon='delete' size='xs' color={chipTextColor} />
          </StyledDeleteButton>
        )}
      </StyledOption>
      {showModal && (
        <DeleteWarningModal
          modalId='delete-tag-modal'
          message={`Are you sure you want to delete this tag?`}
          onClose={onCloseModal}
          onDelete={onDelete}
        />
      )}
    </>
  );
}

export default Tag2Option;

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
