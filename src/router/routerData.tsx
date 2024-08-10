import { lazy } from 'react';

import { RouterElement } from './router';

import Home from '../pages/Home';
import List from '../pages/List';
import Chart from '../pages/Chart';
import PortfolioAllocation from '../views/Chart/PortfolioAllocation/PortfolioAllocation';
import TagAllocation from '../views/Chart/TagAllocation';
import StockBarChart from '@/views/Chart/StockBarChart';
import Sold from '@/pages/Sold';
import Note from '@/pages/Note';

const Login = lazy(() => import('../pages/Login'));
const Signup = lazy(() => import('../pages/Signup'));

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
    label: 'Home',
    element: <Home />,
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
    relocatedPath: '/chart/portfolio-allocation',
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
