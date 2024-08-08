import { useRef } from 'react';
import styled from 'styled-components';

import Icon from './Icon';
import Dropbox from './Dropbox';
import { BorderButton, BorderButtonProps } from './Button';
import useModal from '@/views/List/hooks/useModal';
import { DropboxItem } from './Dropbox/DropboxItem';

type Option = {
  value: string;
  label: string;
};

type RadioSelectProps = Omit<BorderButtonProps, 'onClick'> & {
  options: Option[];
  value: string;
  onClick: (value: string) => void;
  title?: string;
  label?: string;
};

function RadioSelect({
  options,
  value,
  onClick,
  title,
  label,
  ...restProps
}: RadioSelectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { showModal, onToggleModal, onCloseModal } = useModal();

  const onOptionClick = (value: string) => {
    onClick(value);
    onCloseModal();
  };

  const currentLabel =
    label ?? options.find(option => option.value === value)?.label;
  return (
    <StyledDropboxWrapper ref={containerRef}>
      <StyledButton
        className='radio-select__button'
        onClick={onToggleModal}
        {...restProps}
      >
        {currentLabel}
        <Icon icon='arrowDown' />
      </StyledButton>

      {showModal && (
        <StyledDropboxContainer
          onCloseModal={onCloseModal}
          containerRef={containerRef}
        >
          {title && <StyledTitle>{title}</StyledTitle>}
          <StyledOptions>
            {options.map(option => (
              <Option
                key={option.value}
                option={option}
                currentValue={value}
                onClick={onOptionClick}
              />
            ))}
          </StyledOptions>
        </StyledDropboxContainer>
      )}
    </StyledDropboxWrapper>
  );
}

export default RadioSelect;

type OptionProps = {
  option: Option;
  currentValue: string;
  onClick: (value: string) => void;
};

function Option({ option, currentValue, onClick }: OptionProps) {
  const checked = currentValue === option.value;
  return (
    <StyledDropboxItem checked={checked} onClick={() => onClick(option.value)}>
      <Icon icon='check' />
      {option.label}
    </StyledDropboxItem>
  );
}

const StyledButton = styled(BorderButton)`
  border: 1px solid ${({ theme }) => theme.colors.grey400};

  .icon {
    margin-left: 5px;
  }
`;

const StyledDropboxWrapper = styled(Dropbox.Wrapper)`
  width: fit-content;
`;

const StyledDropboxContainer = styled(Dropbox.Container)`
  z-index: 9;
  top: calc(100% + 5px);
  box-shadow: none;
  border: 1px solid ${({ theme }) => theme.colors.grey200};
  font-size: 0.8rem;
  min-width: 100%;
  width: max-content;
`;

const StyledTitle = styled.span`
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 5px 10px 10px 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey200};
`;

const StyledOptions = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  display: flex;
  gap: 5px;
  padding: 10px;

  &:hover {
    background: ${({ theme }) => theme.colors.grey200};
  }
`;

const StyledDropboxItem = styled(DropboxItem)<{ checked: boolean }>`
  .icon {
    opacity: ${({ checked }) => (checked ? 1 : 0)};
  }
`;
