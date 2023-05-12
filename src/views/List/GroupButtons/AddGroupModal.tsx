import React, { useEffect, useState } from 'react';
import { BorderButton, ContainedButton } from '../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addGroup } from '../../../features/groups/groupsSlice';
import { changeCheckInfoToGroupFormat } from './utils';
import { Input } from '../../../components/Input';
import {
  initCheckedItems,
  selectCheckedPurchasedItems,
} from '../../../features/checkedItems/checkedItemsSlice';
import { selectStocks } from '../../../features/stockList/stockListSlice';
import GroupModalTable from './GroupModal/GroupModalTable';
import styled from 'styled-components';

interface AppGroupModalProps {
  onClose: () => void;
}

const AddGroupModal = ({ onClose }: AppGroupModalProps) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const checkedItems = useSelector(selectCheckedPurchasedItems());
  const stocks = useSelector(selectStocks);
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onAddGroup = () => {
    if (!name.trim().length) {
      alert('그룹 이름을 입력해주세요.');
      return;
    }
    const selectedStocks = changeCheckInfoToGroupFormat(checkedItems);
    dispatch(addGroup({ groupName: name, selectedStocks }));
    dispatch(initCheckedItems(stocks));
    onClose();
  };
  useEffect(() => {
    setName('');
  }, [onClose]);

  return (
    <StyledAddGroupModal>
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
    </StyledAddGroupModal>
  );
};

export default AddGroupModal;

const StyledAddGroupModal = styled('div')`
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