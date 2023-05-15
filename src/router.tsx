import { createBrowserRouter } from 'react-router-dom';
import { Router as RemixRouter } from '@remix-run/router/dist/router';
import List from './pages/List';
import Chart from './pages/Chart';
import GeneralLayout from './layout/GeneralLayout';
import { NavbarElement } from './layout/Navbar';

interface RouterElement {
  id: number;
  path: string;
  label: string;
  element: React.ReactNode;
  disabled?: boolean;
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
    disabled: true,
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

export const SidebarContent: NavbarElement[] = routerData.reduce(
  (prev, router) => {
    return [
      ...prev,
      {
        id: router.id,
        path: router.path,
        label: router.label,
        disabled: router.disabled,
      },
    ];
  },
  [] as NavbarElement[],
);
