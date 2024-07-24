import styled from 'styled-components';

import Select from '../../../components/Select';
import IconButton from '@/components/IconButton';

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
          <IconButton
            title='Delete group'
            size='m'
            disabled
            icon='folderDelete'
          />
          <IconButton
            icon='folderAdd'
            disabled
            title='Add new group'
            size='m'
          />
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
`;
