import { StockListState } from '@/features/stockList/type';
import { getTotalSummary } from '../../../features/groups/filters';
import { Context } from 'chartjs-plugin-datalabels';
import { getFixedLocaleString, getPercentage } from '@/utils/number';
import { PercentageAndTotalPrice } from '../type';

const BASE_BACKGROUND_COLORS = [
  'rgba(255, 99, 132, 0.6)',
  'rgba(54, 162, 235, 0.6)',
  'rgba(255, 206, 86, 0.6)',
  'rgba(75, 192, 192, 0.6)',
  'rgba(153, 102, 255, 0.6)',
  'rgba(255, 159, 64, 0.6)',
];

const getBackgroundColor = (length: number) => {
  return Array.from(
    { length },
    (_, i) => BASE_BACKGROUND_COLORS[i % BASE_BACKGROUND_COLORS.length],
  );
};

const BASE_BORDER_COLORS = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
];
const getBorderColor = (length: number) => {
  return Array.from(
    { length },
    (_, i) => BASE_BORDER_COLORS[i % BASE_BORDER_COLORS.length],
  );
};

export const getChartData = (stockAllocationInfo: StockAllocationInfo) => {
  const labels = [];
  const buyData = [];
  const currentData = [];

  for (const stockId of stockAllocationInfo.stockIds) {
    labels.push(stockAllocationInfo.stockIdAndNamePairs[stockId]);
    buyData.push(stockAllocationInfo.buyPrice[stockId].percent);
    currentData.push(stockAllocationInfo.currentPrice[stockId].percent);
  }

  const buyDataLabels = {
    labels: {
      value: {
        font: { size: 15, weight: 'bold' },
        align: 'center',
        anchor: 'bottom',
        offset: 8,
        color: 'white',
        formatter: function (_: unknown, ctx: Context) {
          return ctx.active ? null : ctx.dataset.data[ctx.dataIndex] + '%';
        },
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 4,
      },
    },
  };
  const currentDataLabels = {
    labels: {
      name: {
        align: 'top',
        font: { size: 18, weight: 'bold' },
        offset: 0,
        padding: 0,
        formatter: function (_: unknown, ctx: Context) {
          // @ts-expect-error - ChartData type is not exported from ChartJS
          return ctx.active ? null : ctx.chart.data.labels[ctx.dataIndex];
        },
      },
      value: {
        color: function (ctx: Context) {
          // @ts-expect-error - ChartData type is not exported from ChartJS
          return ctx.dataset.backgroundColor[ctx.dataIndex].replace('0.6', '1');
        },
        font: { size: 15, weight: 'bold' },
        align: 'bottom',
        padding: 4,
        offset: 3,
        formatter: function (_: unknown, ctx: Context) {
          return ctx.active ? null : ctx.dataset.data[ctx.dataIndex] + '%';
        },
        backgroundColor: 'white',
        borderRadius: 4,
      },
    },
  };

  const dataLength = currentData.length;
  const backgroundColor = getBackgroundColor(dataLength);
  const borderColor = getBorderColor(dataLength);
  const datasets = [
    {
      label: `current %`,
      data: currentData,
      backgroundColor,
      borderColor,
      datalabels: currentDataLabels,
    },
    {
      label: `buy %`,
      data: buyData,
      backgroundColor,
      borderColor,
      datalabels: buyDataLabels,
    },
  ];

  return {
    labels,
    datasets,
  };
};

export type StockAllocationInfo = ReturnType<typeof getStockAllocationInfo>;

export const getStockAllocationInfo = (stockInfo: StockListState['stocks']) => {
  const summary = getTotalSummary(stockInfo);

  const stockIds = stockInfo.allIds;
  const stockIdAndNamePairs = stockIds.reduce(
    (acc, stockId) => {
      acc[stockId] = summary.stocksSummary[stockId].stockName;
      return acc;
    },
    {} as Record<string, string>,
  );

  const buyPrice: Record<string, PercentageAndTotalPrice> = {};
  const currentPrice: Record<string, PercentageAndTotalPrice> = {};

  for (const stockId of stockIds) {
    const stockSummary = summary.stocksSummary[stockId];

    buyPrice[stockId] = {
      percent: getPercentage(
        stockSummary.totalPurchasePrice,
        summary.groupSummary.totalPurchasePrice,
      ).toFixed(2),
      totalPrice: getFixedLocaleString(stockSummary.totalPurchasePrice),
    };

    currentPrice[stockId] = {
      percent: getPercentage(
        stockSummary.totalCurrentValue,
        summary.groupSummary.totalCurrentValue,
      ).toFixed(2),
      totalPrice: getFixedLocaleString(stockSummary.totalCurrentValue),
    };
  }

  return {
    stockIdAndNamePairs,
    buyPrice,
    currentPrice,
    stockIds,
  };
};
