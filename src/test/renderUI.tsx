import { Provider } from 'react-redux';
import { store } from '../store';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import GlobalStyles from '../styles/GlobalStyles';
import { RouterProvider } from 'react-router-dom';
import { routers } from '../router/router';

export const wrapper = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <RouterProvider router={routers} />
      </ThemeProvider>
    </Provider>
  );
};
