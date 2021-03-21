import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Routes from './routes';

import store from './services/store';

const App = () => (
  <Provider store={store}>
    <HashRouter>
      <Routes />
    </HashRouter>
  </Provider>
);

export default App;
