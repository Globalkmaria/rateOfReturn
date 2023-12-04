import { ReactElement } from 'react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { PreloadedState, configureStore } from '@reduxjs/toolkit';
import { RenderOptions, render } from '@testing-library/react';

import { AppStore, RootState, preloadedStoreState } from '../store';
import { theme } from '../styles/theme';
import GlobalStyles from '../styles/GlobalStyles';
import { rootRouterData } from '../router/routerData';
import stockListReducer from '../features/stockList/stockListSlice';
import checkedItemsReducer from '../features/checkedItems/checkedItemsSlice';
import groupsReducerReducer from '../features/groups/groupsSlice';
import userSliceReducer from '../features/user/userSlice';

type Route = `/${string}`;

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export const renderWithProviders = (
  ui: ReactElement,
  route?: Route,
  {
    preloadedState = preloadedStoreState,
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: {
        stockList: stockListReducer,
        checkedItems: checkedItemsReducer,
        groups: groupsReducerReducer,
        user: userSliceReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) => {
  const router = createMemoryRouter(
    rootRouterData.map(({ path, element }) => ({
      path,
      element,
    })),
    { initialEntries: [route ?? '/'] },
  );
  const Wrapper = () => (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
