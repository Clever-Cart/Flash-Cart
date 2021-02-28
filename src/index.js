import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import firebase from 'firebase/app';
import env from './env';

// Initialize Firebase
firebase.initializeApp(env);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
