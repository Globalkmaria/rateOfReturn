import { MouseEventHandler } from 'react';

import styled from 'styled-components';

import Icon from '@/components/Icon';
import { TableHead, TableHeadProps } from '@/components/table/Table';

export interface SortTableHeadProps<T extends string> extends TableHeadProps {
  options: {
    asc: T;
    desc: T;
  };
  currentOption: T;
  onChangeSort: (option: T) => void;
  children: React.ReactNode;
}

function SortTableHead<T extends string>({
  options,
  currentOption,
  onChangeSort,
  children,
  ...restProps
}: SortTableHeadProps<T>) {
  const { asc, desc } = options;
  const iconName =
    currentOption === asc
      ? 'sortArrowUp'
      : currentOption === desc
        ? 'sortArrowDown'
        : 'sortArrowUpDown';

  const isSelected = iconName !== 'sortArrowUpDown';

  const onClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (isSelected) onChangeSort(asc === currentOption ? desc : asc);
    else onChangeSort(asc);
  };

  return (
    <TableHead {...restProps}>
      <StyledButton onClick={onClick}>
        {children}
        <Icon size='xs' icon={iconName} />
      </StyledButton>
    </TableHead>
  );
}

export default SortTableHead;

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
