import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from './styles/GlobalStyles';
import { theme } from './styles/theme';
import { store } from './store';
import { Provider } from 'react-redux';
import { routers } from './router/router';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <RouterProvider router={routers} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
