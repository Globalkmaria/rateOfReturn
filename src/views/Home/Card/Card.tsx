import { useRef } from 'react';
import styled from 'styled-components';

import { TopStock } from '../../../repository/topStocks/type';
import ExpandCard from '../../../components/ExpandCard';
import Metrics from './Metrics';
import Ratios from './Ratios';
import Categories from './Categories';
import Logo from './Logo';
import CardHeader from './CardHeader';

type CardProps = {
  stock: TopStock;
};

const Card = ({ stock }: CardProps) => {
  const investLink = useRef<HTMLAnchorElement>(null);

  return (
    <div>
      <StyledContent>
        <CardHeader stock={stock} investRef={investLink} />
        <Logo stock={stock} />
        <Categories stock={stock} />
        <ExpandCard>
          <StyledExpandContent>
            <div>
              <StyledDescriptionLabel>Description</StyledDescriptionLabel>
              <p>{stock.description}</p>
            </div>
            <Metrics financial={stock.financial} />
            <Ratios ratios={stock.ratios} />
          </StyledExpandContent>
        </ExpandCard>
      </StyledContent>
    </div>
  );
};

export default Card;

const StyledContent = styled('div')`
  padding: 25px;
  width: 370px;
  border-radius: 20px;
  box-shadow: rgba(50, 50, 50, 0.3) 0px 8px 20px;
  transition: all 300ms ease-out;

  &:hover {
    transform: translateY(-15px);
  }

  @media ${({ theme }) => theme.devices.mobile} {
    width: 300px;
    font-size: 0.8rem;
  }
`;

export const StyledExpandContent = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StyledLabel = styled.span`
  margin-right: 10px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.grey600};
`;

export const StyledValue = styled.span`
  font-weight: 500;
`;

export const StyledDescriptionLabel = styled(StyledLabel)`
  margin-bottom: 5px;
  display: block;
`;
