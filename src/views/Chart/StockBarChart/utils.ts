import { Context } from 'chartjs-plugin-datalabels';

import {
  PurchasedItemInfo,
  StockList,
  StocksCollection,
} from '@/features/stockList/type';
import { getFixedLocaleString, getPercentage } from '@/utils/number';

export const getStockOptions = (stockList: StocksCollection) => {
  return stockList.allIds.map(stockId => {
    return {
      value: stockId,
      label: stockList.byId[stockId].mainInfo.stockName,
    };
  });
};

const getReturnOfRation = (currentPrice: number, purchasedPrice: number) =>
  getPercentage(currentPrice - purchasedPrice, purchasedPrice).toFixed(2);

const getItemLabel = (item: PurchasedItemInfo) =>
  `#${item.purchasedId} ${item.purchasedDate} ${item.purchasedTime}`;

const getAverageReturn = (stock: StockList) => {
  const { totalQuantity, totalBuyCost } = stock.purchasedItems.allIds.reduce(
    (acc, itemId) => {
      const { purchasedPrice, purchasedQuantity } =
        stock.purchasedItems.byId[itemId];

      acc.totalQuantity += purchasedQuantity;
      acc.totalBuyCost += purchasedQuantity * purchasedPrice;

      return acc;
    },
    {
      totalQuantity: 0,
      totalBuyCost: 0,
    },
  );

  const totalCurrentValue = stock.mainInfo.currentPrice * totalQuantity;
  const profit = getFixedLocaleString(totalCurrentValue - totalBuyCost);
  const ratio = getReturnOfRation(totalCurrentValue, totalBuyCost);

  return {
    ratio,
    profit,
  };
};

const RED = 'rgba(255, 99, 132, 0.5)';
const BLUE = 'rgba(53, 162, 235, 0.5)';
const getBackgroundColors = (data: number[]) =>
  data.map(item => (item >= 0 ? RED : BLUE));

const RED_BORDER = 'rgba(255, 99, 132, 1)';
const BLUE_BORDER = 'rgba(54, 162, 235, 1)';
const getBorderColors = (data: number[]) =>
  data.map(item => (item >= 0 ? RED_BORDER : BLUE_BORDER));

const DATA_LABELS = {
  labels: {
    value: {
      color: function (ctx: Context) {
        // @ts-ignore
        return ctx.dataset.backgroundColor[ctx.dataIndex].replace('0.5', '1');
      },
      backgroundColor: 'white',
      borderRadius: 4,
      font: { size: 15, weight: 'bold' },
      formatter: function (_: any, ctx: Context) {
        return ctx.active ? null : ctx.dataset.data[ctx.dataIndex] + '%';
      },
    },
  },
};

export const stockData = (
  stockName: string,
  stockBarChartInfos: StockBarChartInfos,
) => {
  const labels = [];
  const data = [];

  for (const [, { label, ratio }] of stockBarChartInfos.entries()) {
    labels.push(label);
    data.push(Number(ratio));
  }

  return {
    labels,
    datasets: [
      {
        label: stockName,
        data,
        backgroundColor: getBackgroundColors(data),
        borderColor: getBorderColors(data),
        maxBarThickness: 100,
        datalabels: DATA_LABELS,
        borderWidth: 3,
        borderRadius: 4,
      },
    ],
  };
};

export type StockBarChartInfo = {
  label: string;
  profit: string;
  ratio: string;
};

export type StockBarChartInfos = Map<string, StockBarChartInfo>;

export const getStockBarChartInfos = (stock: StockList) => {
  const result: StockBarChartInfos = new Map();

  const averageReturn = getAverageReturn(stock);

  result.set('Average', {
    label: 'Average',
    profit: averageReturn.profit,
    ratio: averageReturn.ratio,
  });

  for (const id of stock.purchasedItems.allIds) {
    const purchasedItem = stock.purchasedItems.byId[id];
    const profit = getFixedLocaleString(
      (stock.mainInfo.currentPrice - purchasedItem.purchasedPrice) *
        purchasedItem.purchasedQuantity,
    );
    const ratio = getReturnOfRation(
      stock.mainInfo.currentPrice,
      purchasedItem.purchasedPrice,
    );

    const label = getItemLabel(purchasedItem);

    result.set(id, {
      label,
      profit,
      ratio,
    });
  }

  return result;
};
