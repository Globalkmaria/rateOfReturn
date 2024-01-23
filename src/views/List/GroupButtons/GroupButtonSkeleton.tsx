import styled from 'styled-components';

import Select from '../../../components/Select';
import { BorderButton } from '../../../components/Button';

function GroupButtonSkeleton() {
  return (
    <>
      <StyledGroupButtons>
        <Select
          width={140}
          initialValue='1'
          options={[{ value: '1', label: 'Main Group' }]}
          title='Choose group to show'
          disabled
        />
        <Buttons>
          <BorderButton width={133} size='m' disabled title='Delete group'>
            Delete Group
          </BorderButton>
          <BorderButton width={113} size='m' disabled title='Add new group'>
            Add Group
          </BorderButton>
        </Buttons>
      </StyledGroupButtons>
    </>
  );
}

export default GroupButtonSkeleton;

const StyledGroupButtons = styled('div')`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Buttons = styled('div')`
  display: flex;
  gap: 10px;
`;
