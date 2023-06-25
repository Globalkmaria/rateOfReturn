import React from 'react';
import styled from 'styled-components';
import { selectSelectedGroupInfo } from '../../../features/groups/selectors';
import { useSelector } from 'react-redux';
import { selectStocks } from '../../../features/stockList/selectors';
import { getGroupSummary } from './utils';

const GroupSummary = () => {
  const groupInfo = useSelector(selectSelectedGroupInfo());
  const stocks = useSelector(selectStocks);
  const summary = getGroupSummary(groupInfo, stocks);

  return (
    <StyledGroupSummary>
      {CONTENTS.map(({ key, title, format }) => (
        <div className='content' key={key}>
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
  },
];

const StyledGroupSummary = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  padding: 10px;
  gap: 25px;

  .content {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    border: ${({ theme }) => theme.colors.grey900} 3px solid;
    border-radius: 5px;

    .title {
      margin-right: 15px;
      font-weight: 500;
      font-size: 1.2rem;
    }
    .text {
      font-weight: 600;
      font-size: 1.2rem;
      padding: 5px 10px;
      border-radius: 5px;
      background-color: ${({ theme }) => theme.colors.grey900};
      color: white;
    }
  }
`;
