import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import { AppContainer } from 'react-hot-loader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes from './router';
import createStore from './store';
import './index.css';

const store = createStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

export const render = (routesFactory) => {
  ReactDOM.render(
    <AppContainer>
      <MuiThemeProvider>
        <Provider store={store}>
          <Router history={history}>
              {routesFactory(store)}
          </Router>
        </Provider>
      </MuiThemeProvider>
    </AppContainer>,
    document.getElementById('root')
  );
};

injectTapEventPlugin();
render(routes);

if (module.hot) {
  module.hot.accept('./router', () => {
    const newRoutesFactory = require('./router').default;
    render(newRoutesFactory)
  });
}
