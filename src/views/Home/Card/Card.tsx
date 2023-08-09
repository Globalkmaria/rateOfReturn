import { MouseEvent, useRef, useState } from 'react';
import styled from 'styled-components/macro';

import { Stock } from '../../../repository/type';
import ExpandCard from '../../../components/ExpandCard';

type CardProps = {
  stock: Stock;
};

const Card = ({ stock }: CardProps) => {
  const [open, setOpen] = useState(false);
  const investLink = useRef<HTMLAnchorElement>(null);

  const onExpand = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === investLink.current) return;
    setOpen((prev) => !prev);
  };

  return (
    <StyledCard onClick={onExpand}>
      <div className='content'>
        <h1 className='name'>{stock.name}</h1>
        <div className='sub-header'>
          <h2 className='symbol'>{stock.symbol}</h2>
          <a
            ref={investLink}
            href={stock.investUrl}
            target={'_blank'}
            rel='noreferrer'
            className='investing-link'
          >
            investing.com
          </a>
        </div>
        <div className='logo'>
          <img src={stock.imgUrl} alt='apple logo' />
        </div>

        <div className='categorizes'>
          <div className='industry'>
            <span className='label'>Industry</span>
            <span className='chip'>{stock.industry}</span>
          </div>
          <div className='sector'>
            <span className='label'>Sector</span>
            <span className='chip'>{stock.sector}</span>
          </div>
        </div>

        <ExpandCard open={open}>
          <div className='expand-content'>
            <div className='description'>
              <span className='description__label label'>Description</span>
              <p>{stock.description}</p>
            </div>

            <div className='metrics'>
              <div className='metrics-group'>
                <div className='metric'>
                  <span className='label'>Market Cap</span>
                  <span className='value'>{stock.financial.marketCap}</span>
                </div>
                <div className='metric'>
                  <span className='label'>Revenue</span>
                  <span className='value'>{stock.financial.revenue}</span>
                </div>
              </div>

              <div className='metric'>
                <span className='label'>Gross Profit</span>
                <span className='value'>{stock.financial.grossProfit}</span>
              </div>
              <div className='metric'>
                <span className='label'>Operating Income</span>
                <span className='value'>{stock.financial.operatingIncome}</span>
              </div>
            </div>

            <div className='ratios'>
              <div className='ratio'>
                <span className='label'>ROA</span>
                <span className='value'>{stock.ratios.roa}</span>
              </div>
              <div className='ratio'>
                <span className='label'>PBR</span>
                <span className='value'>{stock.ratios.pbr}</span>
              </div>
              <div className='ratio'>
                <span className='label'>PER</span>
                <span className='value'>{stock.ratios.per}</span>
              </div>
            </div>
          </div>
        </ExpandCard>
      </div>
    </StyledCard>
  );
};

export default Card;

const StyledCard = styled('div')`
  .content {
    padding: 25px;
    width: 370px;
    border-radius: 20px;
    box-shadow: rgba(50, 50, 50, 0.3) 0px 8px 20px;
    transition: all 300ms ease-out;

    &:hover {
      transform: translateY(-15px);
    }
  }

  .label {
    margin-right: 10px;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.grey600};
  }

  .value {
    font-weight: 500;
  }

  .name {
    font-size: 1.2rem;
    font-weight: 600;
  }

  .sub-header {
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
  }

  .logo {
    margin: 20px 0 30px;
    display: flex;
    justify-content: center;
    border-radius: 20px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 10px 20px -12px,
      rgba(0, 0, 0, 0.3) 0px 5px 36px -18px;

    img {
      padding: 20px;
      height: 200px;
      width: 100%;
      object-fit: contain;
    }
  }

  .categorizes {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .chip {
      padding: 3px;
      width: fit-content;
      background-color: ${({ theme }) => theme.colors.grey400};
      border-radius: 5px;
      line-height: 1.8rem;
    }
  }

  .expand-content {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .description__label {
      margin-bottom: 5px;
      display: block;
    }

    .metrics {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .metrics-group {
      display: flex;
      justify-content: space-between;
    }

    .metric {
      display: flex;
      gap: 5px;
    }

    .ratios {
      display: flex;
      justify-content: space-between;
    }

    .ratio {
      display: flex;
      gap: 5px;
    }
  }
`;
