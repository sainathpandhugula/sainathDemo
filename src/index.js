import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootreducer from './redux/reducers/rootReducer'
const store = createStore(rootreducer,composeWithDevTools());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
reportWebVitals();
