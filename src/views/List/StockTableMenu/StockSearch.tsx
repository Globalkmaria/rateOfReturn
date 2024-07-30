import { InputHTMLAttributes, useRef } from 'react';
import styled from 'styled-components';

import Icon from '@/components/Icon';

type Heights = 's' | 'm' | 'l';

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  height?: Heights;
}

function StockSearch({
  size,
  height = 's',
  disabled,
  ...restProps
}: SearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onIconClick = () => {
    inputRef.current?.focus();
  };

  return (
    <StyledStockSearch className='search' height={height}>
      <StyledIconButton onClick={onIconClick} disabled={disabled}>
        <Icon icon='search' color={'grey600'} />
      </StyledIconButton>
      <StyledInput
        disabled={disabled}
        ref={inputRef}
        type='text'
        placeholder='Search by stock name...'
        {...restProps}
      />
    </StyledStockSearch>
  );
}

export default StockSearch;

const HEIGHTS: Record<Heights, string> = {
  s: '40px',
  m: '42px',
  l: '48px',
};

const StyledStockSearch = styled('div')<Required<Pick<SearchProps, 'height'>>>`
  align-self: end;
  display: flex;
  align-items: center;
  width: 200px;
  height: ${({ height }) => HEIGHTS[height]};
  padding: 0 10px;
  border-radius: 13px;
  background-color: ${({ theme }) => theme.colors.grey100};
`;

const StyledIconButton = styled('button')`
  margin-right: 5px;

  &:disabled {
    cursor: not-allowed;
  }
`;

const StyledInput = styled('input')`
  border: none;
  width: 100%;
`;
