import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import ErrorBoundary from './components/ErrorBoundary';
import { routers } from './router/router';
import { store } from './store';
import GlobalStyles from './styles/GlobalStyles';
import { theme } from './styles/theme';

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
