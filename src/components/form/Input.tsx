import { InputHTMLAttributes, memo } from 'react';
import styled from 'styled-components/macro';
import ValidityText, { ValidityTextProps } from './ValidityText';

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  id?: string;
  required?: boolean;
  validityConfig?: ValidityTextProps;
}

const FormInput = ({
  id,
  labelText,
  validityConfig,
  required,
  className,
  ...props
}: FormInputProps) => {
  const inputInfo = labelText || validityConfig;
  return (
    <StyledFormInput className={className}>
      {inputInfo && (
        <div className='input-info'>
          {labelText && (
            <label className='input-label' htmlFor={id}>
              {labelText}
              {required && <span className='required'>*</span>}
            </label>
          )}
          {validityConfig && (
            <ValidityText
              text={validityConfig.text}
              isValid={validityConfig.isValid}
            />
          )}
        </div>
      )}
      <input id={id} {...props} className='input' />
    </StyledFormInput>
  );
};

export default memo(FormInput);

const StyledFormInput = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 5px;

  .input-info {
    display: flex;
    justify-content: space-between;
  }

  .required {
    color: ${({ theme }) => theme.colors.red600};
  }

  .input-label {
    font-weight: 600;
  }

  .input {
    padding: 0.5rem 1rem;
    border: 1px solid ${({ theme }) => theme.colors.grey400};
    border-radius: 4px;
    background: ${({ theme }) => theme.colors.white};
  }
`;
