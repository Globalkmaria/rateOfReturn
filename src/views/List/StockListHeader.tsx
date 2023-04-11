import { useDispatch, useSelector } from 'react-redux';
import {
  TableHead,
  TableHeader,
  TableHeadProps,
  TableRow,
} from '../../components/Table';
import {
  selectCheckedItemsInfo,
  updateCheckedItemsInfo,
} from '../../features/stockList/stockListSlice';
import { CheckboxCell } from './StockItem/components';

type HeaderListComponent = typeof CheckAllCheckbox;

type HeaderListProps = {
  id: string;
  label: string;
  Component?: HeaderListComponent;
  width?: number;
  flexBasis?: number;
}[];

const StockListHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        {HEADER_LIST.map(({ id, label, Component, ...restProps }) =>
          Component ? (
            <Component key={id} id={id} {...restProps} />
          ) : (
            <TableHead key={id} {...restProps}>
              {label}
            </TableHead>
          ),
        )}
      </TableRow>
    </TableHeader>
  );
};

export default StockListHeader;

const CheckAllCheckbox = ({ id, ...restProps }: TableHeadProps) => {
  const dispatch = useDispatch();
  const checkedItemsInfo = useSelector(selectCheckedItemsInfo);
  const onChangeCheckbox = (value: boolean) => {
    dispatch(
      updateCheckedItemsInfo({
        type: 'all',
        checked: value,
      }),
    );
  };
  return (
    <CheckboxCell
      type='th'
      key={id}
      {...restProps}
      onClick={onChangeCheckbox}
      value={checkedItemsInfo.allChecked}
    />
  );
};

const HEADER_LIST: HeaderListProps = [
  { id: '1', label: '전체선택', Component: CheckAllCheckbox, width: 50 },
  { id: '2', label: '종목명', flexBasis: 150 },
  { id: '3', label: '번호', width: 50 },
  { id: '4', label: '매입일' },
  { id: '5', label: '매입수량', width: 100 },
  { id: '6', label: '매입가', flexBasis: 120 },
  { id: '7', label: '총매입금액', flexBasis: 150 },
  { id: '8', label: '현재가', flexBasis: 120 },
  { id: '9', label: '평가금액', flexBasis: 100 },
  { id: '10', label: '평가손익', flexBasis: 100 },
  { id: '11', label: '손익률', flexBasis: 100 },
  { id: '12', label: '잠금', width: 50 },
  { id: '13', label: '삭제', width: 50 },
];
