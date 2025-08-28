import styled, { DefaultTheme, IStyledComponent } from 'styled-components';

import CheckAllCheckbox from './CheckAllCheckbox';
import { TableHead, TableHeadProps } from '../../../components/table/Table';

type HeaderListComponent = typeof CheckAllCheckbox;

type BaseHeaderItemProps = {
  id: string;
  label: string;
} & Pick<TableHeadProps, 'fixedWidth' | 'minWidth'>;

type NotTableHeadProps = {
  Component: HeaderListComponent;
  notTableHead: true;
};

type TableHeadPropsVariant = {
  notTableHead?: false;
  Component?:
    | IStyledComponent<'web', DefaultTheme | TableHeadProps | never>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | ((props: any) => React.ReactElement);
};
export type HeaderItemProps = BaseHeaderItemProps &
  (NotTableHeadProps | TableHeadPropsVariant);

function HeaderItem({
  id,
  label,
  Component,
  notTableHead,
  ...restProps
}: HeaderItemProps) {
  if (notTableHead && Component)
    return <Component key={id} id={id} {...restProps} />;

  if (Component)
    return (
      <Component key={id} {...restProps}>
        {label}
      </Component>
    );
  return (
    <TableHead key={id} {...restProps}>
      {label}
    </TableHead>
  );
}

export default HeaderItem;

export const StyledSymbol = styled(TableHead)`
  @media ${({ theme }) => theme.devices.mobile} {
    min-width: 150px;
  }
`;

export const StyledStockName = styled(TableHead)`
  @media ${({ theme }) => theme.devices.mobile} {
    min-width: 70px;
  }
`;
export const StyledBuyId = styled(TableHead)`
  @media ${({ theme }) => theme.devices.mobile} {
    min-width: 40px;
  }
`;
