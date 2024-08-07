import styled from 'styled-components';

const Textarea = styled.textarea`
  padding: 20px;
  background: ${({ theme }) => theme.colors.grey100};
  border: none;
  border-radius: 8px;
  resize: none;
`;

export default Textarea;
