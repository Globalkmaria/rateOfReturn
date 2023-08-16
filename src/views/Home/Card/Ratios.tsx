import styled from 'styled-components/macro';
import { TopStock } from '../../../repository/topStocks/type';

type RatiosProps = {
  ratios: TopStock['ratios'];
};

const Ratios = ({ ratios }: RatiosProps) => {
  return (
    <StyledRatios>
      <div className='ratio'>
        <span className='label'>ROA</span>
        <span className='value'>{ratios.roa}</span>
      </div>
      <div className='ratio'>
        <span className='label'>PBR</span>
        <span className='value'>{ratios.pbr}</span>
      </div>
      <div className='ratio'>
        <span className='label'>PER</span>
        <span className='value'>{ratios.per}</span>
      </div>
    </StyledRatios>
  );
};

export default Ratios;

const StyledRatios = styled('div')`
  display: flex;
  justify-content: space-between;

  .ratio {
    display: flex;
    gap: 5px;
  }
`;
