import { lazy } from 'react';

import PortfolioAllocation from '@/views/Chart/PortfolioAllocation/PortfolioAllocation';
import StockBarChart from '@/views/Chart/StockBarChart';
import TagAllocation from '@/views/Chart/TagAllocation';
import News from '@/views/Home/News';
import TopStocks from '@/views/Home/TopStocks';

import Chart from '@/pages/Chart';
import Home from '@/pages/Home';
import List from '@/pages/List';
import Note from '@/pages/Note';
import Sold from '@/pages/Sold';

import { RouterElement } from './router';

const Login = lazy(() => import('../pages/Login'));
const Signup = lazy(() => import('../pages/Signup'));

export const homeRouterData: RouterElement[] = [
  {
    id: '0',
    path: '',
    element: <News />,
    label: 'News',
  },
  {
    id: '1',
    path: 'top-stocks',
    element: <TopStocks />,
    label: 'Top Stocks',
  },
];

export const chartRouterData: RouterElement[] = [
  {
    id: '0',
    path: 'portfolio-allocation',
    element: <PortfolioAllocation />,
    label: 'Stock Allocation',
    children: [
      {
        id: '0',
        path: 'groups/:groupId',
        element: <PortfolioAllocation />,
        label: 'Group Chart',
      },
    ],
  },
  {
    id: '1',
    path: 'tag-allocation',
    element: <TagAllocation />,
    label: 'Tag Allocation',
    children: [
      {
        id: '0',
        path: 'groups/:groupId',
        element: <TagAllocation />,
        label: 'Group Tag Chart',
      },
    ],
  },
  {
    id: '2',
    path: 'individual-stock-bar',
    element: <StockBarChart />,
    label: 'Individual Stock Return',
    children: [
      {
        id: '0',
        path: 'stocks/:stockId',
        element: <StockBarChart />,
        label: 'Individual Stock Return',
      },
    ],
  },
];

export const rootRouterData: RouterElement[] = [
  {
    id: '0',
    path: '/',
    relocatedPath: `/`,
    label: 'Home',
    element: <Home />,
    children: homeRouterData,
    icon: 'project',
  },
  {
    id: '1',
    path: '/login',
    label: 'Login',
    element: <Login />,
    notNav: true,
  },
  {
    id: '2',
    path: '/signup',
    label: 'Sign up',
    element: <Signup />,
    notNav: true,
  },
  {
    id: '3',
    path: '/portfolio',
    label: 'Current',
    icon: 'table',
    element: <List />,
    children: [
      {
        id: '0',
        path: 'groups/:groupId',
        element: <List />,
        label: 'Group Detail',
      },
    ],
  },
  {
    id: '4',
    path: '/chart',
    relocatedPath: `/chart/${chartRouterData[0].path}`,
    label: 'Chart',
    element: <Chart />,
    children: chartRouterData,
    icon: 'chart',
  },
  {
    id: '5',
    path: '/sold',
    label: 'Sold',
    element: <Sold />,
    icon: 'cabinet',
  },
  {
    id: '6',
    path: '/note',
    label: 'Note',
    element: <Note />,
    icon: 'note',
  },
];
