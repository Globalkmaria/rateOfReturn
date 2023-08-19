import React from 'react';
import styled from 'styled-components';
import {
  selectIsMainGroupSelected,
  selectSelectedGroupInfo,
} from '../../../features/groups/selectors';
import { useSelector } from 'react-redux';
import { selectStocks } from '../../../features/stockList/selectors';
import { getGroupSummary, getMainGroupSummary } from './utils';

const GroupSummary = () => {
  const isMainSelected = useSelector(selectIsMainGroupSelected());
  const groupInfo = useSelector(selectSelectedGroupInfo());
  const stocks = useSelector(selectStocks);
  const summary = isMainSelected
    ? getMainGroupSummary(stocks)
    : getGroupSummary(groupInfo, stocks);

  return (
    <StyledGroupSummary>
      {CONTENTS.map(({ key, title, format, className }) => (
        <div className={`content ${className}`} key={key}>
          <h1 className='title'>{title}</h1>
          <span className='text'>{format(summary[key])}</span>
        </div>
      ))}
    </StyledGroupSummary>
  );
};

export default GroupSummary;

type Contents = {
  key: keyof ReturnType<typeof getGroupSummary>;
  title: string;
  format: (value: number) => string;
  className?: string;
}[];

const CONTENTS: Contents = [
  {
    key: 'totalPurchasedPrice',
    title: 'Total Buy Price',
    format: (value: number) => value.toLocaleString(),
  },
  {
    key: 'totalCurrentValue',
    title: 'Total Current Value',
    format: (value: number) => value.toLocaleString(),
  },
  {
    key: 'returnOfInvestment',
    title: 'Return',
    format: (value: number) => value.toLocaleString(),
  },
  {
    key: 'returnOfInvestmentRatio',
    title: 'Return of Ration',
    format: (value: number) => `${value.toLocaleString()} %`,
    className: 'return-ratio',
  },
];

const StyledGroupSummary = styled('div')`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  padding: 10px;
  gap: 30px;

  .content {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 15px 15px;
    width: 170px;
    background: ${({ theme }) => theme.colors.white};
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 20px 2px;

    .title {
      margin-right: 15px;
      font-weight: 500;
      font-size: 0.8rem;
      color: ${({ theme }) => theme.colors.grey600};
    }

    .text {
      font-weight: 600;
      font-size: min(1.2rem, 5vw);
    }
  }

  .return-ratio {
    span {
      white-space: nowrap;
    }
  }

  @media ${({ theme }) => theme.devices.mobile} {
    margin: 0px;
    margin-bottom: 20px;
    gap: 10px;

    .content {
      flex-direction: column;
      gap: 10px;
      border-width: 2px;
      padding: 5px 10px;
      width: 37vw;
      min-width: 120px;

      .title,
      .text {
        font-size: min(0.8rem, 3vw);
      }
      .title {
        margin-right: 0px;
      }
    }
  }
`;
