import { MouseEvent, useRef, useState } from 'react';
import styled from 'styled-components/macro';

import { Stock } from '../../../repository/type';
import ExpandCard from '../../../components/ExpandCard';
import Metrics from './Metrics';
import Ratios from './Ratios';
import Categories from './Categories';
import Logo from './Logo';
import CardHeader from './CardHeader';

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
        <CardHeader stock={stock} investRef={investLink} />
        <Logo stock={stock} />
        <Categories stock={stock} />
        <ExpandCard open={open}>
          <div className='expand-content'>
            <div className='description'>
              <span className='description__label label'>Description</span>
              <p>{stock.description}</p>
            </div>
            <Metrics financial={stock.financial} />
            <Ratios ratios={stock.ratios} />
          </div>
        </ExpandCard>
      </div>
    </StyledCard>
  );
};

export default Card;

const StyledCard = styled('div')`
  // card global css
  .label {
    margin-right: 10px;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.grey600};
  }

  .value {
    font-weight: 500;
  }

  // local css
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

  .expand-content {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .description__label {
      margin-bottom: 5px;
      display: block;
    }
  }

  @media ${({ theme }) => theme.devices.mobile} {
    .content {
      width: 300px;
      font-size: 0.8rem;
    }
  }
`;
