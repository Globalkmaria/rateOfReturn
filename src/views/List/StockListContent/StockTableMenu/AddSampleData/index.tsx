import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import userDataService from '@/service/userData/userData';

import { selectIsLoggedIn } from '@/features/user/selectors';

import { BorderButton } from '@/components/Button';
import Icon from '@/components/Icon';

import { addStockSampleData } from '@/features';

import { useShowAddSampleBtn } from './useShowAddSampleBtn';

const AddSampleData = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const showAddSampleBtn = useShowAddSampleBtn();
  if (!showAddSampleBtn) return null;

  const onClick = async () => {
    if (isLoggedIn) {
      const result = await userDataService.addStockAndGroupSample();
      if (!result.success) return;
    }

    dispatch(addStockSampleData());
  };

  return (
    <BorderButton onClick={onClick} size='m'>
      <Icon icon='sampleData' />
      <StyledText>Add sample data</StyledText>
    </BorderButton>
  );
};

export default memo(AddSampleData);

const StyledText = styled('span')`
  margin-left: 5px;

  @media ${({ theme }) => theme.devices.laptop} {
    display: none;
  }
`;
