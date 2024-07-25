import styled from 'styled-components';

const Footer = () => {
  return <StyledFooter>© 2024 Maria. All rights reserved.</StyledFooter>;
};

export default Footer;

const StyledFooter = styled('footer')`
  border-top: 1px solid ${({ theme }) => theme.colors.grey300};
  flex: 0 0 fit-content;
  padding: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.grey500};
`;
