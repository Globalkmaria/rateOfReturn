import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BorderButton, ContainedButton } from '../../../components/Button';
import Modal from '../../../components/Modal';
import Select from '../../../components/Select';
import { useDispatch, useSelector } from 'react-redux';
import {
  addGroup,
  selectGroups,
  updateSelectedGroupId,
} from '../../../features/groups/groupsSlice';
import { changeCheckInfoToGroupFormat, getOptions } from './utils';
import { Input } from '../../../components/Input';
import {
  checkedItems,
  selectCheckedPurchasedItems,
  selectIsPurchasedItemChecked,
  updateCheckedItems,
} from '../../../features/checkedItems/checkedItemsSlice';
import { Table, TableBody, TableCell } from '../../../components/Table';
import { TableHeader } from '../../../components/Table';
import { TableHead } from '../../../components/Table';
import { TableRow } from '../../../components/Table';
import { CheckboxCell } from '../StockItem/components';
import { selectStockInfoById } from '../../../features/stockList/stockListSlice';

interface HeaderItemProps {
  id: string;
  label: string;
  width?: number;
  flexBasis?: number;
}

const GroupButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const groups = useSelector(selectGroups);
  const options = getOptions(groups);

  const onClose = () => setIsOpen(false);

  const onGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateSelectedGroupId(e.target.value));
  };

  const onGroupAdd = () => {
    setIsOpen(true);
    // dispatch(
    //   addGroup({
    //     groupName: '새 그룹',
    //     selectedStocks: { byId: {}, allIds: [] },
    //   }),
    // );
  };

  return (
    <>
      <StyledGroupButtons>
        <Select
          onChange={onGroupChange}
          width={140}
          initialValue='1'
          options={options}
        />
        <BorderButton onClick={onGroupAdd} size='m'>
          그룹 생성
        </BorderButton>
        <BorderButton size='m'>그룹 수정</BorderButton>
        <BorderButton size='m'>그룹 삭제</BorderButton>
      </StyledGroupButtons>
      <Modal isOpen={isOpen} onClose={onClose}>
        <StyledGroupModal>
          <AddGroupModal onClose={onClose} />
        </StyledGroupModal>
      </Modal>
    </>
  );
};

export default GroupButtons;

interface AppGroupModalProps {
  onClose: () => void;
}

const AddGroupModal = ({ onClose }: AppGroupModalProps) => {
  const dispatch = useDispatch();
  const groupsInfo = useSelector(selectGroups);
  const checkedItems = useSelector(selectCheckedPurchasedItems());
  const [name, setName] = useState('');
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onAddGroup = () => {
    const selectedStocks = changeCheckInfoToGroupFormat(checkedItems);
    dispatch(
      addGroup({
        groupName: name,
        selectedStocks: selectedStocks,
      }),
    );
    const newGroupId =
      groupsInfo.groups.allIds[groupsInfo.groups.allIds.length - 1];

    dispatch(updateSelectedGroupId(newGroupId));
    setName('');
    onClose();
  };
  useEffect(() => {
    setName('');
  }, [onClose]);

  return (
    <StyledGroupModal>
      <div className='group-name'>
        <label className='group-name__label' htmlFor='group-name'>
          그룹 이름 :
        </label>
        <Input
          value={name}
          onChange={onChangeName}
          width={150}
          id='group-name'
        />
      </div>
      <GroupModalTable />
      <div className='button-groups'>
        <BorderButton onClick={onAddGroup} width={150} size='m'>
          생성
        </BorderButton>
        <ContainedButton width={150} size='m' onClick={onClose}>
          취소
        </ContainedButton>
      </div>
    </StyledGroupModal>
  );
};

const GroupModalTable = () => {
  return (
    <Table>
      <GroupModalTableHead />
      <GroupModalTableBody />
    </Table>
  );
};

const GroupModalTableHead = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead width={40}></TableHead>
        {HEADER_LIST.map(({ id, label, ...restProps }) => (
          <TableHead key={id} id={id} {...restProps}>
            {label}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

const GroupModalTableBody = () => {
  const checkedItems = useSelector(selectCheckedPurchasedItems());

  return (
    <TableBody>
      {checkedItems.map(({ stockId, purchasedId }) => (
        <GroupModalTableRow
          key={purchasedId}
          stockId={stockId}
          purchasedId={purchasedId}
        />
      ))}
    </TableBody>
  );
};

type GroupModalTableRowProps = {
  stockId: string;
  purchasedId: string;
};

const GroupModalTableRow = ({
  stockId,
  purchasedId,
}: GroupModalTableRowProps) => {
  const dispatch = useDispatch();
  const isChecked = useSelector(
    selectIsPurchasedItemChecked(stockId, purchasedId),
  );
  const { mainInfo, purchasedItems } = useSelector(
    selectStockInfoById(stockId),
  );
  const purchasedInfo = purchasedItems.byId[purchasedId];
  const totalPurchasedPrice =
    purchasedInfo.purchasedQuantity * purchasedInfo.purchasedPrice;

  const onCheck = (value: boolean) => {
    dispatch(
      updateCheckedItems({
        type: 'purchased',
        checked: value,
        stockId,
        purchasedId,
      }),
    );
  };

  return (
    <StyledTableRow>
      <CheckboxCell value={isChecked} onClick={onCheck} />
      <TableCell>{mainInfo.stockName}</TableCell>
      <TableCell align='center'>{purchasedInfo.purchasedId}</TableCell>
      <TableCell>
        <Input
          padding={0}
          value={purchasedInfo.purchasedDate}
          type='date'
          disabled
        />
      </TableCell>
      <TableCell align='right'>
        {purchasedInfo.purchasedQuantity.toString()}
      </TableCell>
      <TableCell align='right'>
        {purchasedInfo.purchasedPrice.toLocaleString()}
      </TableCell>
      <TableCell align='right'>
        {totalPurchasedPrice.toLocaleString()}
      </TableCell>
    </StyledTableRow>
  );
};

const HEADER_LIST: HeaderItemProps[] = [
  {
    id: '1',
    label: '종목명',
    width: 150,
  },
  {
    id: '2',
    label: '번호',
    width: 50,
  },
  {
    id: '3',
    label: '매입일',
    width: 200,
  },
  {
    id: '4',
    label: '매입수량',
    width: 100,
  },
  {
    id: '5',
    label: '매입가',
    flexBasis: 120,
  },
  {
    id: '6',
    label: '총매입금액',
    flexBasis: 150,
  },
];

const StyledGroupButtons = styled('div')`
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
`;

const StyledGroupModal = styled('div')`
  display: flex;
  flex-direction: column;
  width: 900px;

  .group-name {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .group-name__label {
      width: 90px;
    }
  }

  .button-groups {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
  }
`;

const StyledTableRow = styled(TableRow)`
  &:hover {
    background: ${({ theme }) => theme.colors.grey100};
  }
`;
