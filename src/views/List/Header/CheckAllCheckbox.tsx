import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import { TableHeadProps } from '../../../components/table/Table';
import { updateCheckedItems } from '../../../features/checkedItems/checkedItemsSlice';
import { selectIsAllChecked } from '../../../features/checkedItems/selectors';
import useIsMainGroup from '../hooks/useIsMainGroup';
import { CheckboxCell } from '../StockItem/components';

function CheckAllCheckbox({ id, ...restProps }: TableHeadProps) {
  const dispatch = useDispatch();
  const isAllChecked = useSelector(selectIsAllChecked);
  const isMainGroup = useIsMainGroup();

  const onChangeCheckbox = (value: boolean) => {
    dispatch(
      updateCheckedItems({
        type: 'all',
        checked: value,
      }),
    );
  };
  return (
    <StyledCheckboxCell
      title='Check all checkboxes'
      type='th'
      key={id}
      {...restProps}
      onClick={onChangeCheckbox}
      value={isAllChecked}
      disabled={!isMainGroup}
    />
  );
}

export default CheckAllCheckbox;

const StyledCheckboxCell = styled(CheckboxCell)`
  @media ${({ theme }) => theme.devices.mobile} {
    min-width: 30px;
  }
`;
