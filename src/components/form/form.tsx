import { FormHTMLAttributes } from 'react';
import styled from 'styled-components';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  gap?: number | string;
}

const Form = ({ children, gap, ...restProps }: FormProps) => {
  return (
    <StyledForm gap={gap} {...restProps}>
      {children}
    </StyledForm>
  );
};

export default Form;

const StyledForm = styled('form')<{ gap?: number | string }>`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) =>
    gap ? (typeof gap === 'string' ? gap : `${gap}px`) : '1.3rem'};
`;
