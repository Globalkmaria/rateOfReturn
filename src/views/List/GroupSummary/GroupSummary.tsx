import React from 'react';
import styled from 'styled-components';
import { selectSelectedGroupInfo } from '../../../features/groups/selectors';
import { useSelector } from 'react-redux';
import { selectStocks } from '../../../features/stockList/selectors';
import { getGroupSummary } from './utils';

const GroupSummary = () => {
  const groupInfo = useSelector(selectSelectedGroupInfo());
  const stocks = useSelector(selectStocks);
  const {
    totalPurchasedPrice,
    totalCurrentValue,
    returnOfInvestment,
    returnOfInvestmentRatio,
  } = getGroupSummary(groupInfo, stocks);

  const formattedTotalPurchasedPrice = totalPurchasedPrice.toLocaleString();
  const formattedTotalCurrentValue = totalCurrentValue.toLocaleString();
  const formattedReturnOfInvestment = returnOfInvestment.toLocaleString();
  const formattedReturnOfInvestmentRatio =
    returnOfInvestmentRatio.toLocaleString() + ' %';

  return (
    <StyledGroupSummary>
      <div className='content'>
        <h1 className='title'>Total Purchased Price</h1>
        <span className='text'>{formattedTotalPurchasedPrice}</span>
      </div>
      <div className='content'>
        <h1 className='title'>Total Current Value</h1>
        <span className='text'>{formattedTotalCurrentValue}</span>
      </div>
      <div className='content'>
        <h1 className='title'>Return</h1>
        <span className='text'>{formattedReturnOfInvestment}</span>
      </div>
      <div className='content'>
        <h1 className='title'>Return of Ration</h1>
        <span className='text'>{formattedReturnOfInvestmentRatio}</span>
      </div>
    </StyledGroupSummary>
  );
};

export default GroupSummary;

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
