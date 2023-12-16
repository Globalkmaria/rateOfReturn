import styled from 'styled-components/macro';

const Footer = () => {
  return <StyledFooter>Copyright © 2023 Dino.M. All rights reserved.</StyledFooter>;
};

export default Footer;

const StyledFooter = styled('footer')`
  flex: 0 0 fit-content;
  margin: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.grey500};
`;
