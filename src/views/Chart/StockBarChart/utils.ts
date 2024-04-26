import { Context } from 'chartjs-plugin-datalabels';

import {
  PurchaseItemCollection,
  PurchasedItemInfo,
  StockList,
  StocksCollection,
} from '@/features/stockList/type';
import { fixedAsNumber, getPercentage } from '@/utils/number';

export const getStockOptions = (stockList: StocksCollection) => {
  return stockList.allIds.map(stockId => {
    return {
      value: stockId,
      label: stockList.byId[stockId].mainInfo.stockName,
    };
  });
};

const getReturnOfRation = (currentPrice: number, purchasedPrice: number) =>
  fixedAsNumber(
    getPercentage(currentPrice - purchasedPrice, purchasedPrice),
    2,
  );

const getItemsData = (
  stock: StockList,
  purchasedItems: PurchaseItemCollection,
) =>
  purchasedItems.allIds.map(itemId =>
    getReturnOfRation(
      stock.mainInfo.currentPrice,
      purchasedItems.byId[itemId].purchasedPrice,
    ),
  );

const getItemLabel = (item: PurchasedItemInfo) =>
  `#${item.purchasedId} ${item.purchasedDate} ${item.purchasedTime}`;

const getStockLabels = (items: PurchaseItemCollection) =>
  items.allIds.map(itemId => getItemLabel(items.byId[itemId]));

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
  return fixedAsNumber(
    getPercentage(totalCurrentValue - totalBuyCost, totalBuyCost),
    2,
  );
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

export const stockData = (stock: StockList) => {
  const labels = ['average', ...getStockLabels(stock.purchasedItems)];
  const average = getAverageReturn(stock);
  const data = [average, ...getItemsData(stock, stock.purchasedItems)];

  return {
    labels,
    datasets: [
      {
        label: stock.mainInfo.stockName,
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
