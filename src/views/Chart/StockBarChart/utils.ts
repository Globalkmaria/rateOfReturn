import { Context } from 'chartjs-plugin-datalabels';
import dayjs from 'dayjs';

import {
  getFixedLocaleString,
  getPercentage,
  localStringToNumber,
} from '@/utils/number';

import {
  PurchasedItemInfo,
  StockList,
  StocksCollection,
} from '@/features/stockList/type';

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

const getItemLabel = (item: PurchasedItemInfo) => {
  const date = new Date(`${item.purchasedDate} ${item.purchasedTime}`);
  const formattedDate = dayjs(date).format('DD MMM YYYY HH:mm');
  return `#${item.purchasedId} ${formattedDate}`;
};

const getAverageReturn = (stock: StockList) => {
  const { totalQuantity, totalBuyCost } = stock.purchasedItems.allIds.reduce(
    (acc, itemId) => {
      const { purchasedPrice, purchasedQuantity } =
        stock.purchasedItems.byId[itemId];

      acc.totalQuantity += localStringToNumber(purchasedQuantity);
      acc.totalBuyCost +=
        localStringToNumber(purchasedQuantity) *
        localStringToNumber(purchasedPrice);

      return acc;
    },
    {
      totalQuantity: 0,
      totalBuyCost: 0,
    },
  );

  const totalCurrentValue =
    localStringToNumber(stock.mainInfo.currentPrice) * totalQuantity;
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
        // @ts-expect-error - ctx.dataset is not typed
        return ctx.dataset.backgroundColor[ctx.dataIndex].replace('0.5', '1');
      },
      backgroundColor: 'white',
      borderRadius: 4,
      font: { size: 15, weight: 'bold' },
      formatter: function (_: unknown, ctx: Context) {
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
  date: string;
  purchasedId: string;
};

export type StockBarChartInfos = Map<string, StockBarChartInfo>;

export const getStockBarChartInfos = (stock?: StockList) => {
  const result: StockBarChartInfos = new Map();
  if (!stock) return result;

  const averageReturn = getAverageReturn(stock);

  result.set('Average', {
    label: 'Average',
    profit: averageReturn.profit,
    ratio: averageReturn.ratio,
    date: '',
    purchasedId: '',
  });

  for (const id of stock.purchasedItems.allIds) {
    const purchasedItem = stock.purchasedItems.byId[id];
    const currentPrice = localStringToNumber(stock.mainInfo.currentPrice);
    const purchasedPrice = localStringToNumber(purchasedItem.purchasedPrice);
    const quantity = localStringToNumber(purchasedItem.purchasedQuantity);

    const profit = getFixedLocaleString(
      (currentPrice - purchasedPrice) * quantity,
    );
    const ratio = getReturnOfRation(currentPrice, purchasedPrice);

    const label = getItemLabel(purchasedItem);

    const date = new Date(
      `${purchasedItem.purchasedDate} ${purchasedItem.purchasedTime}`,
    );
    const formattedDate = dayjs(date).format('DD MMM YYYY HH:mm');

    result.set(id, {
      label,
      profit,
      ratio,
      date: formattedDate,
      purchasedId: id,
    });
  }

  return result;
};
