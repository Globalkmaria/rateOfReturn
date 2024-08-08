import { RefObject, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { BaseInput } from '../Input/BaseInput';
import Icon from '../Icon';
import { Chip, ChipText } from '../Chip';
import Tag2Option, { Tag2OptionProps, Tag2OptionType } from './Tag2Option';
import { ColorsKeys } from '@/styles/theme';

export type TagDropbox2Settings<T extends Tag2OptionType> = {
  height?: number;
  options?: T[];
  onOptionSelect: (option: T | null) => void;
  showCreateNewOption?: boolean;
  subtitle?: string;
  onCreateNewOption?: (option: string) => void;
  placeholder?: string;
} & Pick<Tag2OptionProps<T>, 'onDeleteOption' | 'showDeleteItem'>;

type TagDropbox2Props<T extends Tag2OptionType> = {
  selectedOption?: T | null;
  onCloseModal: () => void;
  width: number;
  tagContainerRef: React.RefObject<HTMLDivElement>;
  ref?: RefObject<HTMLDivElement>;
  chipColor: ColorsKeys;
  chipTextColor: ColorsKeys;
} & TagDropbox2Settings<T>;

const TAG_MAX_LENGTH = 20;

function TagDropbox2<T extends Tag2OptionType>({
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
  showDeleteItem,
  showCreateNewOption = true,
  subtitle = 'Select an option',
  placeholder = 'Search for an option...',
  chipColor,
  chipTextColor,
}: TagDropbox2Props<T>) {
  placeholder = selectedOption ? '' : placeholder;
  const containerRef = ref ?? useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const getLabel = (option: T) =>
    typeof option === 'string' ? option : option.label;

  const getValue = (option: T) =>
    typeof option === 'string' ? option : option.value;

  const filteredOptions = options?.filter(option =>
    getLabel(option).toLowerCase().includes(inputValue.toLowerCase()),
  );

  const isInputValueInOptions = options?.find(
    option => getLabel(option) === inputValue,
  );

  const showCreateNewOptionButton =
    showCreateNewOption && !isInputValueInOptions && inputValue.length > 0;

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    if (e.target.value.length > TAG_MAX_LENGTH) {
      setInputValue(e.target.value.slice(0, TAG_MAX_LENGTH));
      alert(
        `The tag name is too long. The maximum length is ${TAG_MAX_LENGTH} characters.`,
      );
      return;
    }
    setInputValue(e.target.value);
  };

  const onOptionClick = (option: T) => {
    onOptionSelect(option);
    setInputValue('');
    onCloseModal();
  };

  const onClickNewOption = () => {
    onCreateNewOption && onCreateNewOption(inputValue);
    setInputValue('');
    onCloseModal();
  };

  const onKeyPress: React.KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Backspace' && selectedOption && !inputValue) {
      onOptionSelect(null);
    }
  };

  const onDeleteSelectedOption: React.MouseEventHandler = e => {
    onOptionSelect(null);
  };

  const label = selectedOption
    ? typeof selectedOption === 'string'
      ? selectedOption
      : selectedOption.label
    : '';

  const wrap = selectedOption
    ? width / (label.length * 3) < 8
      ? true
      : false
    : false;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if ((event.target as Element).closest('#delete-tag-modal')) return;
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
          <Chip color={chipColor}>
            <ChipText color={chipTextColor} width={width}>
              {label}
            </ChipText>
            <button type='button' onClick={onDeleteSelectedOption}>
              <Icon icon='close' size='xs' color={chipTextColor} />
            </button>
          </Chip>
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
        <StyledOptionHelperText>{subtitle}</StyledOptionHelperText>
        {filteredOptions &&
          filteredOptions?.map(option => (
            <Tag2Option
              key={getValue(option)}
              option={option}
              onDeleteOption={onDeleteOption}
              onOptionClick={onOptionClick}
              width={width}
              showDeleteItem={showDeleteItem}
              chipColor={chipColor}
              chipTextColor={chipTextColor}
            />
          ))}
        {showCreateNewOptionButton && (
          <StyledCreateButton key={inputValue} onClick={onClickNewOption}>
            {`Create `}
            <Chip color={chipColor}>
              <ChipText color={chipTextColor} width={width - 80}>
                {inputValue}
              </ChipText>
            </Chip>
          </StyledCreateButton>
        )}
      </StyledOptions>
    </StyledDropbox>
  );
}

export default TagDropbox2;

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
