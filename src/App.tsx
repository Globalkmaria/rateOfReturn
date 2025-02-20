import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import GlobalStyles from './styles/GlobalStyles';
import { theme } from './styles/theme';

import { store } from './store';
import { routers } from './router/router';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <RouterProvider router={routers} />
        </ThemeProvider>
      </Provider>
      <div id='portal-container' />
    </ErrorBoundary>
  );
}

export default App;
