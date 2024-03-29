import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Components/App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { Provider } from "react-redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import rootReducer from "./reducer/rootReducer"

const composedEnhancer = compose(applyMiddleware(thunkMiddleware), composeWithDevTools());

const store = createStore(
  rootReducer,
  composedEnhancer
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <UserProvider> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </UserProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

