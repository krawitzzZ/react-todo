import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App, Home, Todos } from './components/main';

export default () => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="todos" component={Todos}/>
    </Route>
  );
};
