import { createStore } from 'redux';

function app(state = { signed: false }, action) {
  switch (action.type) {
    case 'LOGIN':
      return { app: { signed: true } };
    case 'LOGOUT':
      return { app: { signed: false } };
    default:
      return state;
  }
}

export default createStore(app, { app: { signed: false } });
