import styled from 'styled-components/macro';
import { TopStock } from '../../../repository/topStocks/type';

type MetricsProps = {
  financial: TopStock['financial'];
};

const Metrics = ({ financial }: MetricsProps) => {
  return (
    <StyledMetrics>
      <div className='metrics-group'>
        <div className='metric'>
          <span className='label'>Market Cap</span>
          <span className='value'>{financial.marketCap}</span>
        </div>
        <div className='metric'>
          <span className='label'>Revenue</span>
          <span className='value'>{financial.revenue}</span>
        </div>
      </div>

      <div className='metric'>
        <span className='label'>Gross Profit</span>
        <span className='value'>{financial.grossProfit}</span>
      </div>
      <div className='metric'>
        <span className='label'>Operating Income</span>
        <span className='value'>{financial.operatingIncome}</span>
      </div>
    </StyledMetrics>
  );
};

export default Metrics;

const StyledMetrics = styled('div')`
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
`;
