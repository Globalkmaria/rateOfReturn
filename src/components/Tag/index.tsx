import { useRef } from 'react';

import styled from 'styled-components';

import useModal from '@/views/List/hooks/useModal';

import TagDropbox, { TagDropboxSettings } from './TagDropbox';

interface Props {
  width?: number;
  height?: number;
  options?: string[];
  onCreateNewOption: (option: string) => void;
  onDeleteOption: (option: string) => void;
  selectedOption?: string;
  onOptionSelect: (option: string) => void;
  disabled?: boolean;
  dropboxSettings?: TagDropboxSettings;
}

function Tag({
  width = 200,
  height = 30,
  onCreateNewOption,
  onDeleteOption,
  selectedOption,
  onOptionSelect,
  options,
  disabled,
  dropboxSettings,
}: Props) {
  const { showModal, onCloseModal, onToggleModal } = useModal();
  const tagContainerRef = useRef<HTMLDivElement>(null);

  return (
    <StyledContainer ref={tagContainerRef} disabled={disabled}>
      <StyledSelectedOption
        height={height}
        onClick={onToggleModal}
        disabled={disabled}
      >
        {selectedOption && (
          <StyledChip>
            <StyledChipText width={width - 20}>{selectedOption}</StyledChipText>
          </StyledChip>
        )}
      </StyledSelectedOption>
      {showModal && (
        <TagDropbox
          tagContainerRef={tagContainerRef}
          width={width}
          selectedOption={selectedOption}
          options={options}
          onCloseModal={onCloseModal}
          onOptionSelect={onOptionSelect}
          onCreateNewOption={onCreateNewOption}
          onDeleteOption={onDeleteOption}
          {...dropboxSettings}
        />
      )}
    </StyledContainer>
  );
}

export default Tag;

const StyledContainer = styled.div<{
  disabled?: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledSelectedOption = styled.button.attrs({
  type: 'button',
})<{ height: number }>`
  border-radius: 5px;
  background: ${({ theme, disabled }) =>
    disabled ? 'transparent' : theme.colors.grey300};
  height: ${({ height }) => height}px;
  width: 100%;

  &:disabled {
    cursor: default;
  }
`;

export const StyledChip = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 5px;
  padding: 5px;
  background: ${({ theme }) => theme.colors.grey300};
  width: fit-content;
  max-width: 100%;
`;

export const StyledChipText = styled.p.withConfig({
  shouldForwardProp: prop => !['width'].includes(prop),
})<{ width: number }>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: ${({ width }) => width}px;
`;
