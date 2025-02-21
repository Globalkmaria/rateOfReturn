import styled from 'styled-components';

import { StyledLabel, StyledValue } from './Card';
import { TopStock } from '../../../repository/topStocks/type';

type RatiosProps = {
  ratios: TopStock['ratios'];
};

const Ratios = ({ ratios }: RatiosProps) => {
  return (
    <StyledRatios>
      <StyledRatio>
        <StyledLabel>ROA</StyledLabel>
        <StyledValue>{ratios.roa}</StyledValue>
      </StyledRatio>
      <StyledRatio>
        <StyledLabel>PBR</StyledLabel>
        <StyledValue>{ratios.pbr}</StyledValue>
      </StyledRatio>
      <StyledRatio>
        <StyledLabel>PER</StyledLabel>
        <StyledValue>{ratios.per}</StyledValue>
      </StyledRatio>
    </StyledRatios>
  );
};

export default Ratios;

const StyledRatios = styled('div')`
  display: flex;
  justify-content: space-between;
`;

const StyledRatio = styled('div')`
  display: flex;
  gap: 5px;
`;
