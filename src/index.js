import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MainRouter from './router';
import { AppContainer } from 'react-hot-loader';
import './index.css';

export const render = (RouterComponent) => {
  ReactDOM.render(
    <AppContainer>
      <MuiThemeProvider>
          <RouterComponent/>
      </MuiThemeProvider>
    </AppContainer>,
    document.getElementById('root')
  );
};

injectTapEventPlugin();
render(MainRouter);
