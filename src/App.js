import React from 'react';
import { HashRouter } from 'react-router-dom';

import history from './services/history';
import Routes from './routes';

const App = () => (
  <HashRouter history={history}>
    <Routes />
  </HashRouter>
);

export default App;
