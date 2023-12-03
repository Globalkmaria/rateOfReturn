import { Provider } from 'react-redux';
import { store } from '../store';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import GlobalStyles from '../styles/GlobalStyles';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { rootRouterData } from '../router/routerData';

type Route = `/${string}`;

export const wrapper = (route?: Route) => {
  const router = createMemoryRouter(
    rootRouterData.map(({ path, element }) => ({
      path,
      element,
    })),
    { initialEntries: [route ?? '/'] },
  );
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
};
