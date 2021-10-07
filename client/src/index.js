import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "antd/dist/antd.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
// 1. import from react-redux and redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

// 2. create user reducer function

// 3. combine multiple reducers

// 4. create a redux store
const store = createStore (rootReducer, composeWithDevTools());

// 5. provide redux store to the entire app (creating a store is useless if we can not provide it to the app)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
