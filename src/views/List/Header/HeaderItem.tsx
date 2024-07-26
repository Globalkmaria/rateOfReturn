import styled, { DefaultTheme, IStyledComponent } from 'styled-components';

import { TableHead, TableHeadProps } from '../../../components/Table';
import CheckAllCheckbox from './CheckAllCheckbox';

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
