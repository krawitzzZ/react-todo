import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App, Todos } from './components/main';

export default (store) => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Todos}/>
    </Route>
  );
};
