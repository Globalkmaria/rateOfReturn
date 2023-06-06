import { RouterElement } from './router';
import List from '../pages/List';
import Chart from '../pages/Chart';
import PortfolioAllocation from '../views/Chart/PortfolioAllocation/PortfolioAllocation';

export const chartRouterData: RouterElement[] = [
  {
    id: 0,
    path: 'portfolio-allocation',
    element: <PortfolioAllocation />,
    label: 'Portfolio Allocation',
  },
];

export const rootRouterData: RouterElement[] = [
  {
    id: 0,
    path: '/',
    label: 'List',
    element: <List />,
  },
  {
    id: 1,
    path: '/chart',
    relocatedPath: '/chart/portfolio-allocation',
    label: 'Chart',
    element: <Chart />,
    children: chartRouterData,
  },
];
