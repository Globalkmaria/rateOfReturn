import styled from 'styled-components';

import { ContainedButton } from '@/components/Button';

export const StyledField = styled.div`
  display: flex;
  align-items: center;

  .radio-select__button {
    border: none;

    &:hover {
      border: none;
    }
  }

  .tag-modal {
    width: 220px;

    @media ${({ theme }) => theme.devices.tablet} {
      font-size: 0.7rem;
      width: 180px;
    }
  }
`;

export const StyledName = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  width: 150px;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.grey600};

  @media ${({ theme }) => theme.devices.tablet} {
    font-size: 0.8rem;
  }
`;

export const StyledNoteModal = styled.div`
  width: 700px;
  padding: 20px 60px;

  @media ${({ theme }) => theme.devices.laptop} {
    padding: 20px 40px;
    width: 500px;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 20px 10px;
    width: 300px;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;

  ${ContainedButton} {
    margin-top: 10px;
  }

  @media ${({ theme }) => theme.devices.tablet} {
    gap: 5px;
  }
`;
