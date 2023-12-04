import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { selectIsMainGroupSelected, selectSelectedGroupInfo } from '../../../features/groups/selectors';
import { selectStocks } from '../../../features/stockList/selectors';
import { CalculateStockSummaryResult, calculateGroupSummary } from './utils';

const GroupSummary = () => {
  const isMainGroupSelected = useSelector(selectIsMainGroupSelected);
  const groupInfo = useSelector(selectSelectedGroupInfo);
  const stocks = useSelector(selectStocks);
  const summary = calculateGroupSummary({
    stocksData: stocks,
    groupData: isMainGroupSelected ? null : groupInfo,
  });

  return (
    <StyledGroupSummary>
      {SUMMARY_CONTENTS.map(({ key, title, format, className }) => (
        <div title={`${key}`} className={`content ${className}`} key={key}>
          <h1 className='title'>{title}</h1>
          <span className='text'>{format(summary[key])}</span>
        </div>
      ))}
    </StyledGroupSummary>
  );
};

export default GroupSummary;

type Contents = {
  key: keyof CalculateStockSummaryResult;
  title: string;
  format: (value: number) => string;
  className?: string;
}[];

export const SUMMARY_CONTENTS: Contents = [
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
    format: (value: number) => {
      if (Number.isNaN(value)) return '0 %';
      return `${value.toLocaleString()} %`;
    },
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
