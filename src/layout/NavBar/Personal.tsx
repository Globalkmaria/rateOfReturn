import { useRef } from 'react';
import { Link } from 'react-router-dom';

import Dropbox from '@/components/Dropbox';
import IconButton from '@/components/IconButton';

import useModal from '@/views/List/hooks/useModal';

import { cacheLoginPage, cacheSignupPage } from './utils';
import styled from 'styled-components';

function Personal() {
  const { showModal, onToggleModal, onCloseModal } = useModal();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <StyledDropdownWrapper ref={ref}>
      <IconButton icon={'person'} onClick={onToggleModal} size='l' />
      {showModal && (
        <Dropbox.Container
          width={140}
          vertical='bottom'
          horizontal='right'
          containerRef={ref}
          onCloseModal={onCloseModal}
        >
          <StyledLink
            to='/login'
            onMouseEnter={cacheLoginPage}
            onClick={onCloseModal}
          >
            Log in
          </StyledLink>
          <StyledLink
            to='/signup'
            onMouseEnter={cacheSignupPage}
            onClick={onCloseModal}
          >
            Sign up
          </StyledLink>
        </Dropbox.Container>
      )}
    </StyledDropdownWrapper>
  );
}

export default Personal;

const StyledDropdownWrapper = styled(Dropbox.Wrapper)`
  z-index: 9;
`;

const StyledLink = styled(Link)`
  && {
    padding: 10px 15px;
    font-size: 0.9rem;
    font-weight: 500;
  }
`;
