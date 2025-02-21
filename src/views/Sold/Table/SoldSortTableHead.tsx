import { MouseEventHandler } from 'react';

import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import styled from 'styled-components';

import { TableHead } from '@/components/Table';

export interface SoldSortTableHeadProps<T extends string> {
  options: {
    asc: T;
    desc: T;
  };
  currentOption: T;
  onChangeSort: (option: T) => void;
  children: React.ReactNode;
}

function SoldSortTableHead<T extends string>({
  options,
  currentOption,
  onChangeSort,
  children,
  ...restProps
}: SoldSortTableHeadProps<T>) {
  const { asc, desc } = options;
  const Icon =
    currentOption === asc
      ? FaSortUp
      : currentOption === desc
        ? FaSortDown
        : FaSort;
  const isSelected = Icon !== FaSort;

  const onClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (isSelected) onChangeSort(asc === currentOption ? desc : asc);
    else onChangeSort(asc);
  };

  return (
    <TableHead {...restProps}>
      <StyledButton onClick={onClick}>
        {children}
        <Icon />
      </StyledButton>
    </TableHead>
  );
}

export default SoldSortTableHead;

export const StyledButton = styled.button.attrs({ type: 'button' })`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 2px;
  font-size: inherit;

  &:hover {
    text-decoration: underline;
  }
`;
