import { memo } from 'react';
import { FaEdit, FaSave } from 'react-icons/fa';

import { BorderButton } from '../../../components/Button';
import { LockButtonProps, StyledEditBtnWrapper } from './components';

const EditButton = ({ isLock, onClick, disabled }: LockButtonProps) => {
  const Icon = isLock ? FaEdit : FaSave;
  const title = isLock ? 'Edit' : 'Save';
  return (
    <StyledEditBtnWrapper isLock={isLock}>
      <BorderButton
        disabled={disabled}
        disableIcon={disabled}
        width={40}
        onClick={onClick}
        title={title}
        aria-label={title}
      >
        <Icon />
      </BorderButton>
    </StyledEditBtnWrapper>
  );
};

export default memo(EditButton);
