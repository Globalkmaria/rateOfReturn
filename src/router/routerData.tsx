import { lazy } from 'react';

import { RouterElement } from './router';
import Home from '../pages/Home';
import List from '../pages/List';
import Chart from '../pages/Chart';
import PortfolioAllocation from '../views/Chart/PortfolioAllocation/PortfolioAllocation';
const Login = lazy(() => import('../pages/Login'));
const Signup = lazy(() => import('../pages/Signup'));

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
    label: 'Home',
    element: <Home />,
  },
  {
    id: 1,
    path: '/login',
    label: 'Login',
    element: <Login />,
    notNav: true,
  },
  {
    id: 2,
    path: '/signup',
    label: 'Sign up',
    element: <Signup />,
    notNav: true,
  },
  {
    id: 3,
    path: '/portfolio',
    label: 'List',
    element: <List />,
  },
  {
    id: 4,
    path: '/chart',
    relocatedPath: '/chart/portfolio-allocation',
    label: 'Chart',
    element: <Chart />,
    children: chartRouterData,
  },
];
