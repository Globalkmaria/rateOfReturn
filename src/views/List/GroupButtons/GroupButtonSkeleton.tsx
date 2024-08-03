import styled from 'styled-components';

import IconButton from '@/components/IconButton';
import RadioSelect from '@/components/RadioSelect';

function GroupButtonSkeleton() {
  return (
    <>
      <StyledGroupButtons>
        <RadioSelect
          onClick={() => {}}
          value={'1'}
          width={140}
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
