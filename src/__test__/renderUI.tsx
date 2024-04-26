import { PropsWithChildren, ReactElement, ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { RenderOptions, render } from '@testing-library/react';

import { AppStore, RootState, preloadedStoreState, setupStore } from '../store';
import { theme } from '../styles/theme';
import GlobalStyles from '../styles/GlobalStyles';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export const renderWithProviders = (ui: ReactElement, extendedRenderOptions: ExtendedRenderOptions = {}) => {
  const {
    preloadedState = {},
    store = setupStore(Object.keys(preloadedState).length ? preloadedState : preloadedStoreState),
    ...renderOptions
  } = extendedRenderOptions;
  const Wrapper = ({ children }: PropsWithChildren) => (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <MemoryRouter>{children}</MemoryRouter>
        </ThemeProvider>
      </Provider>
      <div id='portal-container'></div>
    </>
  );

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export const renderWithStyle = (ui: ReactElement) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
      <div id='portal-container'></div>
    </>
  );

  return { ...render(ui, { wrapper: Wrapper }) };
};
