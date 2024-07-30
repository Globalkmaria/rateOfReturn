import { DetailedHTMLProps, HTMLAttributes, useCallback, useMemo } from 'react';
import { FastOmit } from 'styled-components/dist/types';
import styled, { IStyledComponent } from 'styled-components';
import { useSelector } from 'react-redux';

import {
  selectIsMainGroupSelected,
  selectSelectedGroupInfo,
} from '../../../features/groups/selectors';
import { selectStocks } from '../../../features/stockList/selectors';
import { CalculateStockSummaryResult, calculateGroupSummary } from './utils';

type Contents = {
  key: keyof CalculateStockSummaryResult;
  title: string;
  format: (value: number) => string;
  Component: IStyledComponent<
    'web',
    FastOmit<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
      never
    >
  >;
}[];

function GroupSummary() {
  const isMainGroupSelected = useSelector(selectIsMainGroupSelected);
  const groupInfo = useSelector(selectSelectedGroupInfo);
  const stocks = useSelector(selectStocks);
  const summary = calculateGroupSummary({
    stocksData: stocks,
    groupData: isMainGroupSelected ? null : groupInfo,
  });

  const getContents = useCallback(
    ({ key, title, format, Component }: Contents[0]) => (
      <Component title={`${key}`} key={key}>
        <StyledTitle>{title}</StyledTitle>
        <StyledText>{format(summary[key])}</StyledText>
      </Component>
    ),
    [summary],
  );

  const firstRow = useMemo(
    () => SUMMARY_CONTENTS.slice(0, 2).map(getContents),
    [getContents],
  );

  const secondRow = useMemo(
    () => SUMMARY_CONTENTS.slice(2).map(getContents),
    [getContents],
  );

  return (
    <StyledGroupSummary>
      <StyledWrapper>{firstRow}</StyledWrapper>
      <StyledWrapper>{secondRow}</StyledWrapper>
    </StyledGroupSummary>
  );
}

export default GroupSummary;

const StyledGroupSummary = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  border-top: 1px solid ${({ theme }) => theme.colors.grey400};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey400};

  @media ${({ theme }) => theme.devices.laptop} {
    flex-wrap: wrap;
  }
`;

export const StyledContent = styled.div`
  display: flex;
  gap: 8px;
  margin: 15px 0;
  padding: 0 15px;
  min-width: fit-content;
  border-right: 1px solid ${({ theme }) => theme.colors.grey300};

  @media ${({ theme }) => theme.devices.laptop} {
    flex-direction: column;
    gap: 10px;
    padding: 0px 10px;
    margin: 10px;
    min-width: fit-content;
    width: 37vw;
    min-width: 120px;

    &:nth-child(2) {
      border-right: none;
    }
  }
`;

const StyledWrapper = styled.div`
  display: flex;

  &:nth-child(2) ${StyledContent}:nth-child(2) {
    border-right: none;
  }
`;

const StyledTitle = styled.h1`
  margin-right: 15px;
  font-weight: 600;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.black};

  @media ${({ theme }) => theme.devices.laptop} {
    font-size: min(0.8rem, 3vw);
    margin-right: 0px;
  }
`;

const StyledText = styled.span`
  font-weight: 600;
  font-size: min(1.2rem, 5vw);

  @media ${({ theme }) => theme.devices.laptop} {
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
    title: 'Market Value',
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
    title: 'Rate of Return',
    format: (value: number) => {
      if (Number.isNaN(value)) return '0 %';
      return `${value.toLocaleString()} %`;
    },
    Component: StyledReturnRatio,
  },
];
