import { STOCKS_DATA } from '@/__test__/mock/stocks';
import { Group } from '../../../../features/groups/type';
import { StockListState } from '../../../../features/stockList/type';
import { CalculateStockSummaryResult } from '../utils';

interface SummaryData {
  mainSummary: CalculateStockSummaryResult;
  groupSummary: CalculateStockSummaryResult;
  stockData: StockListState['stocks'];
  groupData: Group;
}

export const SUMMARY_PLUS_RESULT_DATA: SummaryData = {
  mainSummary: {
    totalPurchasedPrice: 15600,
    totalCurrentValue: 29600,
    returnOfInvestment: 14000,
    returnOfInvestmentRatio: 89.744,
  },

  groupSummary: {
    totalPurchasedPrice: 11600,
    totalCurrentValue: 22800,
    returnOfInvestment: 11200,
    returnOfInvestmentRatio: 96.552,
  },

  stockData: STOCKS_DATA,

  groupData: {
    groupId: '2',
    groupName: 'Group1',
    stocks: {
      byId: {
        '1': ['1'],
        '2': ['3', '4'],
      },
      allIds: ['1', '2'],
    },
  },
};

export const SUMMARY_MINUS_RESULT_DATA: SummaryData = {
  mainSummary: {
    totalPurchasedPrice: 41000,
    totalCurrentValue: 29600,
    returnOfInvestment: -11400,
    returnOfInvestmentRatio: -27.805,
  },
  groupSummary: {
    totalPurchasedPrice: 37000,
    totalCurrentValue: 22800,
    returnOfInvestment: -14200,
    returnOfInvestmentRatio: -38.378,
  },
  stockData: {
    byId: {
      1: {
        mainInfo: {
          stockName: 'Google',
          currentPrice: '3,400.0000',
          stockId: '1',
        },
        purchasedItems: {
          byId: {
            1: {
              purchasedId: '1',
              purchasedDate: '2023-01-01',
              purchasedQuantity: '2',
              purchasedPrice: '4,000.0000',
              purchasedTime: '09:57',
            },
            2: {
              purchasedId: '2',
              purchasedDate: '2023-06-05',
              purchasedQuantity: '2',
              purchasedPrice: '2,000.0000',
              purchasedTime: '14:13',
            },
          },
          allIds: ['1', '2'],
        },
      },
      2: {
        mainInfo: {
          stockName: 'Apple',
          currentPrice: '2,000.0000',
          stockId: '2',
        },
        purchasedItems: {
          byId: {
            3: {
              purchasedId: '3',
              purchasedDate: '2023-05-26',
              purchasedQuantity: '1',
              purchasedPrice: '1,000.0000',
              purchasedTime: '13:01',
            },
            4: {
              purchasedId: '4',
              purchasedDate: '2023-04-24',
              purchasedQuantity: '7',
              purchasedPrice: '4,000.0000',
              purchasedTime: '15:02',
            },
          },
          allIds: ['3', '4'],
        },
      },
    },
    allIds: ['1', '2'],
  },
  groupData: {
    groupId: '2',
    groupName: 'Group1',
    stocks: {
      byId: {
        1: ['1'],
        2: ['3', '4'],
      },
      allIds: ['1', '2'],
    },
  },
};
