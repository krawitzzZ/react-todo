import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk';
import apiClient from './utils/apiClient';
import createAsyncMiddleware from './reducers/middleware/asyncMiddleware';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const preloadedState = window.__PRELOADED_STATE__ || {};

export default (history) => createStore(
  reducers,
  preloadedState,
  composeEnhancers(
    applyMiddleware(
      createAsyncMiddleware(apiClient),
      routerMiddleware(history),
      thunk,
    )
  ),
);
