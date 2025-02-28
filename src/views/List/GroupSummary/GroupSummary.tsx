import { DetailedHTMLProps, HTMLAttributes, memo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import styled, { IStyledComponent } from 'styled-components';
import { FastOmit } from 'styled-components/dist/types';

import { checkIfMainGroup } from '@/utils/group';

import { MAIN_GROUP_ID } from '@/features/groups/mockData';

import { CalculateStockSummaryResult, calculateGroupSummary } from './utils';
import { selectGroupInfo } from '../../../features/groups/selectors';
import { selectStocks } from '../../../features/stockList/selectors';

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
  const { groupId = MAIN_GROUP_ID } = useParams();
  const isMainGroupSelected = checkIfMainGroup(groupId);

  const groupInfo = useSelector(selectGroupInfo(groupId));
  const stocks = useSelector(selectStocks);

  const summary = calculateGroupSummary({
    stocksData: stocks,
    groupData: isMainGroupSelected ? null : groupInfo,
  });

  const getContents = ({ key, title, format, Component }: Contents[0]) => (
    <Component title={`${key}`} key={key}>
      <StyledTitle>{title}</StyledTitle>
      <StyledText>{format(summary[key])}</StyledText>
    </Component>
  );

  const firstRow = SUMMARY_CONTENTS.slice(0, 2).map(getContents);
  const secondRow = SUMMARY_CONTENTS.slice(2).map(getContents);

  return (
    <StyledGroupSummary>
      <StyledGroupRowWrapper>{firstRow}</StyledGroupRowWrapper>
      <StyledGroupRowWrapper>{secondRow}</StyledGroupRowWrapper>
    </StyledGroupSummary>
  );
}

export default memo(GroupSummary);

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
  margin: 1.2rem 0;
  padding: 0 1rem;
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

const StyledGroupRowWrapper = styled.div`
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
