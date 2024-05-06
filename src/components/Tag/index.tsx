import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import useModal from '@/views/List/hooks/useModal';
import TagDropbox from './TagDropbox';

interface Props {
  width?: number;
  options?: string[];
  handleCreateNewOption: (option: string) => void;
  handleDeleteOption: (option: string) => void;
  selectedOption: string | null;
  handleSelectOption: (option: string | null) => void;
}

function Tag({
  width = 200,
  handleCreateNewOption,
  handleDeleteOption,
  selectedOption,
  handleSelectOption,
  options,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { showModal, onOpenModal, onCloseModal } = useModal();

  const onOptionSelect = (option: string | null) => {
    handleSelectOption(option);
    onCloseModal();
  };

  const onCreateNewOption = handleCreateNewOption;

  const onDeleteOption = (option: string) => {
    handleDeleteOption(option);

    if (selectedOption === option) {
      handleSelectOption(null);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if ((event.target as Element).closest('div[role="dialog"]')) return;

      if (!containerRef.current?.contains(event.target as Node)) {
        onCloseModal();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <StyledContainer ref={containerRef}>
      <StyledSelectedOption onClick={onOpenModal}>
        {selectedOption && (
          <StyledChip>
            <StyledChipText width={width - 20}>{selectedOption}</StyledChipText>
          </StyledChip>
        )}
      </StyledSelectedOption>
      {showModal && (
        <TagDropbox
          width={width}
          selectedOption={selectedOption}
          options={options}
          onOptionSelect={onOptionSelect}
          onCreateNewOption={onCreateNewOption}
          onDeleteOption={onDeleteOption}
        />
      )}
    </StyledContainer>
  );
}

export default Tag;

const StyledContainer = styled.div`
  position: relative;
  padding: 5px;
`;

const StyledSelectedOption = styled.button.attrs({
  type: 'button',
})`
  height: 20px;
  width: 100%;
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
