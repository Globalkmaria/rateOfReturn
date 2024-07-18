import { RefObject, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import TagOption from './TagOption';
import { BaseInput } from '../Input/BaseInput';
import { StyledChip, StyledChipText } from '.';
import Icon from '../Icon';

export interface TagDropboxSettings {
  height?: number;
}

interface TagDropboxProps {
  options?: string[];
  selectedOption?: string;
  onCloseModal: () => void;
  onOptionSelect: (option: string) => void;
  onCreateNewOption: (option: string) => void;
  onDeleteOption: (option: string) => void;
  width: number;
  tagContainerRef: React.RefObject<HTMLDivElement>;
  ref?: RefObject<HTMLDivElement>;
}

function TagDropbox({
  options,
  selectedOption,
  onOptionSelect,
  onCreateNewOption,
  onDeleteOption,
  width,
  onCloseModal,
  tagContainerRef,
  height,
  ref,
}: TagDropboxProps & TagDropboxSettings) {
  const containerRef = ref ?? useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const filteredOptions = options?.filter(option =>
    option.toLowerCase().includes(inputValue.toLowerCase()),
  );

  const isInputValueInOptions = options?.includes(inputValue);
  const showCreateNewOption = !isInputValueInOptions && inputValue.length > 0;
  const placeholder = selectedOption ? '' : 'Select a tag...';

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    if (e.target.value.length > 20) {
      alert('The tag name is too long. The maximum length is 20 characters.');
      return;
    }
    setInputValue(e.target.value);
  };

  const onOptionClick = (option: string) => {
    onOptionSelect(option);
    setInputValue('');
    onCloseModal();
  };

  const onClickNewOption = () => {
    onCreateNewOption(inputValue);
    onOptionSelect(inputValue);
    setInputValue('');
    onCloseModal();
  };

  const onKeyPress: React.KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Backspace' && selectedOption && !inputValue) {
      onOptionSelect('');
    }
  };

  const onDeleteSelectedOption: React.MouseEventHandler = e => {
    onOptionSelect('');
  };

  const wrap = selectedOption
    ? width / (selectedOption.length * 3) < 8
      ? true
      : false
    : false;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if ((event.target as Element).closest('div[role="dialog"]')) return;
      if (tagContainerRef?.current?.contains(event.target as Node)) return;
      if (containerRef.current?.contains(event.target as Node)) return;

      onCloseModal();
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <StyledDropbox ref={containerRef} className='tag-modal'>
      <StyledFirstLine wrap={wrap}>
        {selectedOption && (
          <StyledChip>
            <StyledChipText width={width}>{selectedOption}</StyledChipText>
            <button type='button' onClick={onDeleteSelectedOption}>
              <Icon icon='close' size='xs' color='grey600' />
            </button>
          </StyledChip>
        )}
        <BaseInput
          ref={inputRef}
          value={inputValue}
          type='text'
          onChange={onInputChange}
          onKeyDown={onKeyPress}
          placeholder={placeholder}
        />
      </StyledFirstLine>
      <StyledOptions height={height}>
        <StyledOptionHelperText>
          Select a tag or create one
        </StyledOptionHelperText>
        {filteredOptions &&
          filteredOptions?.map(option => (
            <TagOption
              key={option}
              option={option}
              onDeleteOption={onDeleteOption}
              onOptionClick={onOptionClick}
              width={width}
            />
          ))}
        {showCreateNewOption && (
          <StyledCreateButton key={inputValue} onClick={onClickNewOption}>
            {`Create `}
            <StyledChip>
              <StyledChipText width={width - 80}>{inputValue}</StyledChipText>
            </StyledChip>
          </StyledCreateButton>
        )}
      </StyledOptions>
    </StyledDropbox>
  );
}

export default TagDropbox;

const StyledDropbox = styled.div`
  position: absolute;
  width: 200px;
  top: 0px;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 10px 2px;
  z-index: 10;
`;

const StyledFirstLine = styled.div.withConfig({
  shouldForwardProp: prop => !['wrap'].includes(prop),
})<{ wrap: boolean }>`
  display: flex;
  flex-wrap: ${({ wrap }) => (wrap ? 'wrap' : 'nowrap')};
  gap: 5px;
  padding: 10px;
  border-radius: 5px 5px 0 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey200};
  background: ${({ theme }) => theme.colors.grey100};

  && ${BaseInput} {
    width: 100%;
    background: ${({ theme }) => theme.colors.grey100};
  }
`;

const StyledOptions = styled.div<{
  height?: number;
}>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px;

  ${({ height }) =>
    height &&
    `max-height: ${height}px;
  overflow: auto;`}
`;

const StyledOptionHelperText = styled.span`
  display: block;
  padding: 5px;
  color: ${({ theme }) => theme.colors.grey600};
  font-size: 0.8rem;
`;

const StyledCreateButton = styled.button.attrs({ type: 'button' })`
  display: flex;
  align-items: center;
  padding: 5px;
  gap: 5px;

  border-radius: 5px;

  &:hover {
    background: ${({ theme }) => theme.colors.grey100};
  }
`;
