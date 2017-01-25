require('./config/polyfills');

import Express from 'express';
import http from 'http';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createHistory from 'react-router/lib/createMemoryHistory';
import { AppContainer } from 'react-hot-loader';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  cyan500, cyan700, pinkA200, grey100, grey300,
  grey400, grey500, white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';


import createStore from './src/store';
import routes from './src/router';

function requestHandler(req, res) {
  const memoryHistory = createHistory(req.originalUrl);
  const store = createStore(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store);

  const muiTheme = getMuiTheme({
    palette: {
      primary1Color: cyan500,
      primary2Color: cyan700,
      primary3Color: grey400,
      accent1Color: pinkA200,
      accent2Color: grey100,
      accent3Color: grey500,
      textColor: darkBlack,
      secondaryTextColor: fade(darkBlack, 0.54),
      alternateTextColor: white,
      canvasColor: white,
      borderColor: grey300,
      disabledColor: fade(darkBlack, 0.3),
      pickerHeaderColor: cyan500,
      clockCircleColor: fade(darkBlack, 0.07),
      shadowColor: fullBlack,
    },
  }, {
    avatar: {
      borderColor: null,
    },
    userAgent: req.headers['user-agent'],
  });

  const html = renderToString(
    <AppContainer>
      <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={store}>
          <Router history={history}>
            {routes(store)}
          </Router>
        </Provider>
      </MuiThemeProvider>
    </AppContainer>
  );

  const preloadedState = store.getState();
  res.send(renderFullPage(html, preloadedState));
}

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for Security issues with this approach:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
        </script>
        <script src="/static/js/bundle.js"></script>
      </body>
    </html>
    `
}

const app = new Express();
app.use(requestHandler);
const server = new http.Server(app);

app.use('*', (req, res) => {
  res.json({ response: 'YOU ARE GOOD' });
});

server.listen(5000, (err) => {
  if (err) {
    console.error(err);
  }
  console.info('==> 💻  Open http://%s:%s in a browser to view the app.', 'localhost', 5000);
});
