import styled from 'styled-components/macro';

export type ValidityTextProps = {
  text: string;
  isValid: boolean;
};

const ValidityText = ({ text, isValid }: ValidityTextProps) => {
  return <StyledValidityText isValid={isValid}>{text}</StyledValidityText>;
};

export default ValidityText;

const StyledValidityText = styled('div')<Pick<ValidityTextProps, 'isValid'>>`
  color: ${({ isValid, theme }) =>
    isValid ? theme.colors.teal500 : theme.colors.red600};
`;
