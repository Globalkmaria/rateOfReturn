import { InputHTMLAttributes, memo } from 'react';
import styled from 'styled-components/macro';
import ValidityText, { ValidityTextProps } from './ValidityText';

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  id?: string;
  required?: boolean;
  validityConfig?: ValidityTextProps;
}

const FormInput = ({ id, labelText, validityConfig, required, className, ...props }: FormInputProps) => {
  const inputInfo = labelText || validityConfig;
  return (
    <StyledFormInput className={className}>
      {inputInfo && (
        <StyledInputInfo>
          {labelText && (
            <StyledLabel htmlFor={id}>
              {labelText}
              {required && <StyledRequired>*</StyledRequired>}
            </StyledLabel>
          )}
          {validityConfig && <ValidityText text={validityConfig.text} isValid={validityConfig.isValid} />}
        </StyledInputInfo>
      )}
      <StyledInput id={id} {...props} />
    </StyledFormInput>
  );
};

export default memo(FormInput);

const StyledFormInput = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const StyledInputInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledRequired = styled.span`
  color: ${({ theme }) => theme.colors.red600};
`;

const StyledLabel = styled.label`
  font-weight: 600;
`;

const StyledInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.grey400};
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.white};
`;
