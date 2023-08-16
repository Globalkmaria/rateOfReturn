import { RefObject } from 'react';
import styled from 'styled-components/macro';

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
        <h2 className='symbol'>{stock.symbol}</h2>
        <a
          ref={investRef}
          href={stock.investUrl}
          target={'_blank'}
          rel='noreferrer'
          className='investing-link'
        >
          investing.com
        </a>
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

  .symbol {
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.grey600};
  }

  .investing-link {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.grey600};
  }
`;
