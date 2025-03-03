import { MouseEventHandler } from 'react';

import styled from 'styled-components';

import Icon from '@/components/Icon';
import { TableHead, TableHeadProps } from '@/components/table/Table';

export type SortTableHeadProps<T extends string> = TableHeadProps & {
  rowSpan?: number;
  colSpan?: number;
  options: {
    asc: T;
    desc: T;
  };
  currentOption: T;
  onSortChange: (option: T) => void;
  children: React.ReactNode;
};

function SortTableHead<T extends string>({
  options,
  currentOption,
  onSortChange,
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
    if (isSelected) onSortChange(asc === currentOption ? desc : asc);
    else onSortChange(asc);
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
