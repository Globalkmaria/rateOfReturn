import { ContainedButton } from '@/components/Button';
import styled from 'styled-components';

export const StyledField = styled.div`
  display: flex;
  align-items: center;

  .radio-select__button {
    border: none;

    &:hover {
      border: none;
    }
  }
`;

export const StyledName = styled.span`
  width: 150px;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.grey600};
`;

export const StyledNoteModal = styled.div`
  width: 700px;
  padding: 20px 60px;

  @media ${({ theme }) => theme.devices.laptop} {
    padding: 20px 40px;
    width: 500px;
  }

  @media ${({ theme }) => theme.devices.tablet} {
    padding: 20px 20px;
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
`;
