import styled from 'styled-components/macro';
import { Stock } from '../../../repository/type';

interface CardProps {
  stock: Stock;
}

const Card = ({ stock }: CardProps) => {
  return (
    <StyledCard href={stock.investUrl} target={'_blank'}>
      <h1 className='name'>{stock.name}</h1>
      <h2 className='symbol'>{stock.symbol}</h2>
      <div className='logo'>
        <img src={stock.imgUrl} alt='apple logo' />
      </div>
      <div className='info'>
        <div className='industry'>
          <span className='label'>Industry</span>
          <span className='chip'>{stock.industry}</span>
        </div>
        <div className='sector'>
          <span className='label'>Sector</span>
          <span className='chip'>{stock.sector}</span>
        </div>
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
    </StyledCard>
  );
};

export default Card;

const StyledCard = styled('a')`
  padding: 25px;
  width: 330px;
  border-radius: 20px;
  box-shadow: rgba(50, 50, 50, 0.3) 0px 8px 20px;
  transition: all 0.3s ease-out;

  &:hover {
    transform: translateY(-15px);
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

  .symbol {
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.grey600};
  }

  .logo {
    display: flex;
    justify-content: center;
    margin: 20px 0;
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

  .info {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .chip {
    padding: 3px;
    width: fit-content;
    background-color: ${({ theme }) => theme.colors.grey400};
    border-radius: 5px;
    line-height: 1.8rem;
  }

  .industry {
    margin-top: 10px;
  }

  .description__label {
    display: block;
    margin-bottom: 5px;
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
`;
