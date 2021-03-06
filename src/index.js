import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ReduxAsyncConnect } from 'redux-async-connect';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import { AppContainer } from 'react-hot-loader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getRoutes from './router';
import createStore from './store';
import apiClient from './utils/apiClient';
import './index.css';

const store = createStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

export const render = (routesFactory) => {
  ReactDOM.render(
    <AppContainer>
      <MuiThemeProvider>
        <Provider store={store} key="provider">
          <Router
            key={Math.random()}
            history={history}
            render={props =>
              <ReduxAsyncConnect {...props} helpers={{apiClient}} />}
          >
            {routesFactory(store)}
          </Router>
        </Provider>
      </MuiThemeProvider>
    </AppContainer>,
    document.getElementById('root')
  );
};

injectTapEventPlugin();
render(getRoutes);

if (module.hot) {
  module.hot.accept('./router', () => {
    render(getRoutes);
  });
}
