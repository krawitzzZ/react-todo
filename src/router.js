import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import { AppContainer } from 'react-hot-loader';
import { render } from './index';
import { App, Todos } from './components/main';
import createStore from './store';

const store = createStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

export default () => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Todos}/>
      </Route>
    </Router>
  </Provider>
);

if (module.hot) {
  module.hot.accept('./components/main/app/App', () => {
    const NewApp = require('./components/main/app/App').default;
    render(NewApp)
  });
}
