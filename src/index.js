import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import store from './store';
import { AppContainer } from 'react-hot-loader';
import App from './components/main/app/App';
import './index.css';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <MuiThemeProvider>
        <Provider store={store}>
          <Component />
        </Provider>
      </MuiThemeProvider>
    </AppContainer>,
    document.getElementById('root')
  );
};

injectTapEventPlugin();
render(App);

if (module.hot) {
  module.hot.accept('./components/main/app/App', () => {
    const NewApp = require('./components/main/app/App').default;
    render(NewApp)
  });
}
