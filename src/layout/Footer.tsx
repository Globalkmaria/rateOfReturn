import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <StyledFooter>Copyright © 2023 Dino.M. All rights reserved.</StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled('footer')`
  margin: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.grey500};
`;
