import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './app/store';
import {Provider} from 'react-redux';
import { BrowserRouter as Router} from 'react-router-dom';

import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
    <App className="App"/>
    </Router>
  </Provider>
);

