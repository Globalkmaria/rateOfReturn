import { InputHTMLAttributes, useRef } from 'react';

import styled from 'styled-components';

import Icon from '@/components/Icon';

type Heights = 's' | 'm' | 'l';

export interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  height?: Heights;
  width?: string;
}

function Search({
  size,
  height = 's',
  width = '200px',
  disabled,
  ...restProps
}: SearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onIconClick = () => {
    inputRef.current?.focus();
  };

  return (
    <StyledSearch className='search' width={width} height={height}>
      <StyledIconButton onClick={onIconClick} disabled={disabled}>
        <Icon icon='search' color={'grey600'} />
      </StyledIconButton>
      <StyledInput
        disabled={disabled}
        ref={inputRef}
        type='text'
        {...restProps}
      />
    </StyledSearch>
  );
}

export default Search;

const HEIGHTS: Record<Heights, string> = {
  s: '40px',
  m: '42px',
  l: '48px',
};

const StyledSearch = styled('div')<
  Required<Pick<SearchProps, 'height' | 'width'>>
>`
  display: flex;
  align-items: center;
  width: ${({ width }) => width};
  height: ${({ height }) => HEIGHTS[height]};
  padding: 0 10px;
  border-radius: 13px;
  background-color: ${({ theme }) => theme.colors.grey100};
`;

const StyledIconButton = styled('button')`
  margin-right: 5px;

  &:disabled {
    cursor: not-allowed;

    svg {
      fill: ${({ theme }) => theme.colors.grey400};
    }
  }
`;

const StyledInput = styled('input')`
  border: none;
  width: 100%;

  &:disabled {
    cursor: not-allowed;
  }

  &:disabled::placeholder {
    color: ${({ theme }) => theme.colors.grey400};
  }
`;
