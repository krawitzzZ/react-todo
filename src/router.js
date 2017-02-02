import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App, Home, Todos } from './components/main';
import { isUserLoaded, loadUser } from './reducers/auth';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    const state = store.getState();

    if (state.auth.authenticated && !isUserLoaded(state) && !state.auth.loadingUser) {
      store.dispatch(loadUser()).then(checkAuth).catch(checkAuth);
    } else {
      checkAuth();
    }

    function checkAuth() {
      const { auth: { user, error } } = store.getState();

      if (!user || (error && error.code === 401)) {
        replace('/');
      }

      cb();
    }
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>

      <Route onEnter={requireLogin}>
        <Route path="todos" component={Todos}/>
      </Route>

    </Route>
  );
};
