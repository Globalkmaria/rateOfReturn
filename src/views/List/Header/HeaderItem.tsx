import styled, { DefaultTheme, StyledComponent } from 'styled-components/macro';

import { TableHead, TableHeadProps } from '../../../components/Table';
import CheckAllCheckbox from './CheckAllCheckbox';

type HeaderListComponent = typeof CheckAllCheckbox;

export type HeaderItemProps =
  | {
      id: string;
      label: string;
      fixedWidth?: number;
      minWidth?: number;
    } & (
      | {
          Component: HeaderListComponent;
          notTableHead: true;
        }
      | {
          notTableHead?: false;
          Component?: StyledComponent<'th', DefaultTheme, TableHeadProps, never>;
        }
    );

function HeaderItem({ id, label, Component, notTableHead, ...restProps }: HeaderItemProps) {
  if (notTableHead && Component) return <Component key={id} id={id} {...restProps} />;
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
export const StyledTotalPurchase = styled(TableHead)`
  border-right: ${({ theme }) => `4px double ${theme.colors.grey600}`};
`;
