import { useRef } from 'react';
import styled from 'styled-components';

import useModal from '@/views/List/hooks/useModal';
import TagDropbox, { TagDropbox2Settings } from './Tag2Dropbox';
import { Chip, ChipText } from '../Chip';
import { Tag2OptionType } from './Tag2Option';

type Props<T extends Tag2OptionType> = {
  width?: number;
  height?: number;
  selectedOption?: T | null;
  disabled?: boolean;
  dropboxSettings: TagDropbox2Settings<T>;
  showCreateNewOption?: boolean;
  subtitle?: string;
};

function Tag2<T extends Tag2OptionType>({
  width = 200,
  height = 30,
  selectedOption,
  disabled,
  dropboxSettings,
}: Props<T>) {
  const label = selectedOption
    ? typeof selectedOption === 'string'
      ? selectedOption
      : selectedOption.label
    : '';
  const { showModal, onCloseModal, onToggleModal } = useModal();
  const tagContainerRef = useRef<HTMLDivElement>(null);

  return (
    <StyledContainer ref={tagContainerRef} disabled={disabled}>
      <StyledSelectedOption
        height={height}
        onClick={onToggleModal}
        disabled={disabled}
      >
        {selectedOption ? (
          <Chip>
            <ChipText width={width - 20}>{label}</ChipText>
          </Chip>
        ) : (
          <StyledEmptyText>Empty</StyledEmptyText>
        )}
      </StyledSelectedOption>
      {showModal && (
        <TagDropbox
          tagContainerRef={tagContainerRef}
          width={width}
          selectedOption={selectedOption}
          onCloseModal={onCloseModal}
          {...dropboxSettings}
        />
      )}
    </StyledContainer>
  );
}

export default Tag2;

const StyledContainer = styled.div<{
  disabled?: boolean;
}>`
  position: relative;
  width: 100%;
`;

const StyledSelectedOption = styled.button.attrs({
  type: 'button',
})<{ height: number }>`
  width: 100%;
  height: ${({ height }) => height}px;
  padding: 5px;
  border-radius: 5px;
  text-align: left;

  &:hover {
    background: ${({ theme }) => theme.colors.grey100};
  }

  &:disabled {
    cursor: default;
  }
`;

const StyledEmptyText = styled.span`
  color: ${({ theme }) => theme.colors.grey500};
  width: 100%;
  font-size: 1rem;
`;
