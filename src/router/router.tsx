import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { Router as RemixRouter } from '@remix-run/router/dist/router';

import GeneralLayout from '../layout/GeneralLayout';
import { NavbarElement } from '../layout/NavBar/Navbar';
import { rootRouterData } from './routerData';
import ErrorPage from '../pages/ErrorPage';

export interface RouterElement {
  id: string;
  path: string;
  relocatedPath?: string;
  label: string;
  element: React.ReactNode;
  disabled?: boolean;
  children?: RouterElement[];
  notNav?: boolean;
}

const getChildrenPath = (route?: RouteObject): RouteObject[] | undefined => {
  if (!route?.children?.length) return undefined;

  return route.children.map(child => {
    const grandchildren = getChildrenPath(child);
    return {
      id: `${route.path}/${child.path}`,
      path: child.path,
      element: child.element,
      children: grandchildren,
    };
  });
};

export const routers: RemixRouter = createBrowserRouter(
  rootRouterData.map(router => {
    return {
      path: router.path,
      element: <GeneralLayout>{router.element}</GeneralLayout>,
      errorElement: <ErrorPage />,
      children: router?.children?.map(child => {
        return {
          path: child.path,
          element: child.element,
          children: getChildrenPath(child),
        };
      }),
    };
  }),
);

export const SidebarContent: NavbarElement[] = rootRouterData.reduce(
  (prev, router) => {
    if (router.notNav) return prev;
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
