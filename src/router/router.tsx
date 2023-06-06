import { createBrowserRouter } from 'react-router-dom';
import { Router as RemixRouter } from '@remix-run/router/dist/router';

import GeneralLayout from '../layout/GeneralLayout';
import { NavbarElement } from '../layout/Navbar';
import { rootRouterData } from './routerData';
import ErrorPage from '../pages/ErrorPage';

export interface RouterElement {
  id: number;
  path: string;
  relocatedPath?: string;
  label: string;
  element: React.ReactNode;
  disabled?: boolean;
  children?: RouterElement[];
}

export const routers: RemixRouter = createBrowserRouter(
  rootRouterData.map((router) => {
    return {
      path: router.path,
      element: <GeneralLayout>{router.element}</GeneralLayout>,
      errorElement: <ErrorPage />,
      children: router?.children?.map((child) => {
        return {
          path: child.path,
          element: child.element,
        };
      }),
    };
  }),
);

export const SidebarContent: NavbarElement[] = rootRouterData.reduce(
  (prev, router) => {
    return [
      ...prev,
      {
        id: router.id,
        path: router.relocatedPath || router.path,
        label: router.label,
        disabled: router.disabled,
      },
    ];
  },
  [] as NavbarElement[],
);
