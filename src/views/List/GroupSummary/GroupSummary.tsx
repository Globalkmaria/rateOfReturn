import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { FastOmit } from 'styled-components/dist/types';
import styled, { IStyledComponent } from 'styled-components';
import { useSelector } from 'react-redux';

import { selectIsMainGroupSelected, selectSelectedGroupInfo } from '../../../features/groups/selectors';
import { selectStocks } from '../../../features/stockList/selectors';
import { CalculateStockSummaryResult, calculateGroupSummary } from './utils';

type Contents = {
  key: keyof CalculateStockSummaryResult;
  title: string;
  format: (value: number) => string;
  Component: IStyledComponent<
    'web',
    FastOmit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>
  >;
}[];

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
      {SUMMARY_CONTENTS.map(({ key, title, format, Component }) => (
        <Component title={`${key}`} key={key}>
          <StyledTitle>{title}</StyledTitle>
          <StyledText>{format(summary[key])}</StyledText>
        </Component>
      ))}
    </StyledGroupSummary>
  );
};

export default GroupSummary;

const StyledGroupSummary = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  padding: 10px;
  gap: 30px;

  @media ${({ theme }) => theme.devices.mobile} {
    margin: 0px;
    margin-bottom: 20px;
    gap: 10px;
  }
`;

export const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 15px;
  min-width: fit-content;
  width: 170px;
  min-height: 76px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 20px 2px;

  @media ${({ theme }) => theme.devices.mobile} {
    flex-direction: column;
    gap: 10px;
    border-width: 2px;
    padding: 5px 10px;
    min-width: fit-content;
    width: 37vw;
    min-width: 120px;
  }
`;

const StyledTitle = styled.h1`
  margin-right: 15px;
  font-weight: 500;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.grey600};

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: min(0.8rem, 3vw);
    margin-right: 0px;
  }
`;

const StyledText = styled.span`
  font-weight: 600;
  font-size: min(1.2rem, 5vw);

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: min(0.8rem, 3vw);
  }
`;

const StyledReturnRatio = styled(StyledContent)`
  span {
    white-space: nowrap;
  }
`;

export const SUMMARY_CONTENTS: Contents = [
  {
    key: 'totalPurchasedPrice',
    title: 'Total Buy Price',
    format: (value: number) => value.toLocaleString(),
    Component: StyledContent,
  },
  {
    key: 'totalCurrentValue',
    title: 'Total Current Value',
    format: (value: number) => value.toLocaleString(),
    Component: StyledContent,
  },
  {
    key: 'returnOfInvestment',
    title: 'Return',
    format: (value: number) => value.toLocaleString(),
    Component: StyledContent,
  },
  {
    key: 'returnOfInvestmentRatio',
    title: 'Return of Ration',
    format: (value: number) => {
      if (Number.isNaN(value)) return '0 %';
      return `${value.toLocaleString()} %`;
    },
    Component: StyledReturnRatio,
  },
];
