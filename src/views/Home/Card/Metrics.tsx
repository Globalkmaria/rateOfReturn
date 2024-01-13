import styled from 'styled-components';

import { TopStock } from '../../../repository/topStocks/type';
import { StyledLabel, StyledValue } from './Card';

type MetricsProps = {
  financial: TopStock['financial'];
};

const Metrics = ({ financial }: MetricsProps) => {
  return (
    <div>
      <StyledMetricsGroup>
        <StyledMetric>
          <StyledLabel>Market Cap</StyledLabel>
          <StyledValue>{financial.marketCap}</StyledValue>
        </StyledMetric>
        <StyledMetric>
          <StyledLabel>Revenue</StyledLabel>
          <StyledValue>{financial.revenue}</StyledValue>
        </StyledMetric>
      </StyledMetricsGroup>

      <StyledMetric>
        <StyledLabel>Gross Profit</StyledLabel>
        <StyledValue>{financial.grossProfit}</StyledValue>
      </StyledMetric>
      <StyledMetric>
        <StyledLabel>Operating Income</StyledLabel>
        <StyledValue>{financial.operatingIncome}</StyledValue>
      </StyledMetric>
    </div>
  );
};

export default Metrics;

const StyledMetricsGroup = styled('div')`
  display: flex;
  justify-content: space-between;
`;
const StyledMetric = styled('div')`
  display: flex;
  gap: 5px;
`;
