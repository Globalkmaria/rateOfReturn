import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import useModal from '@/views/List/hooks/useModal';
import TagDropbox from './TagDropbox';

interface Props {
  width?: number;
  height?: number;
  options?: string[];
  onCreateNewOption: (option: string) => void;
  onDeleteOption: (option: string) => void;
  selectedOption?: string;
  onOptionSelect: (option: string) => void;
  disabled?: boolean;
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
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tagDropboxRef = useRef<HTMLDivElement>(null);
  const { showModal, onCloseModal, onToggleModal } = useModal();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if ((event.target as Element).closest('div[role="dialog"]')) {
        return;
      }

      if (containerRef.current?.contains(event.target as Node)) return;
      if (tagDropboxRef.current?.contains(event.target as Node)) return;

      onCloseModal();
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <StyledContainer disabled={disabled} ref={containerRef}>
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
          ref={tagDropboxRef}
          width={width}
          selectedOption={selectedOption}
          options={options}
          onCloseModal={onCloseModal}
          onOptionSelect={onOptionSelect}
          onCreateNewOption={onCreateNewOption}
          onDeleteOption={onDeleteOption}
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
