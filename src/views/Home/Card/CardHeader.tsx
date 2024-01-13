import { RefObject } from 'react';
import styled from 'styled-components';

import { TopStock } from '../../../repository/topStocks/type';

type CardHeaderProps = {
  stock: TopStock;
  investRef: RefObject<HTMLAnchorElement>;
};

const CardHeader = ({ stock, investRef }: CardHeaderProps) => {
  return (
    <>
      <StyledName>{stock.name}</StyledName>
      <StyledSubHeader>
        <StyledSymbol>{stock.symbol}</StyledSymbol>
        <StyledInvesting ref={investRef} href={stock.investUrl} target={'_blank'} rel='noreferrer'>
          investing.com
        </StyledInvesting>
      </StyledSubHeader>
    </>
  );
};

export default CardHeader;

const StyledName = styled('h1')`
  font-size: 1.2rem;
  font-weight: 600;
`;

const StyledSubHeader = styled('div')`
  display: flex;
  justify-content: space-between;
`;

const StyledSymbol = styled('h2')`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.grey600};
`;

const StyledInvesting = styled('a')`
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.grey600};
`;
