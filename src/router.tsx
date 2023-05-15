import { createBrowserRouter } from 'react-router-dom';
import { Router as RemixRouter } from '@remix-run/router/dist/router';
import { SidebarElement } from './layout/Sidebar';
import List from './pages/List';
import Chart from './pages/Chart';
import GeneralLayout from './layout/GeneralLayout';

interface RouterElement {
  id: number;
  path: string;
  label: string;
  element: React.ReactNode;
}

const routerData: RouterElement[] = [
  {
    id: 0,
    path: '/',
    label: 'List',
    element: <List />,
  },
  {
    id: 1,
    path: '/chart',
    label: 'Chart',
    element: <Chart />,
  },
];

export const routers: RemixRouter = createBrowserRouter(
  routerData.map((router) => {
    return {
      path: router.path,
      element: <GeneralLayout>{router.element}</GeneralLayout>,
    };
  }),
);

export const SidebarContent: SidebarElement[] = routerData.reduce(
  (prev, router) => {
    return [
      ...prev,
      {
        id: router.id,
        path: router.path,
        label: router.label,
      },
    ];
  },
  [] as SidebarElement[],
);
