import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';
import user from './user';
import todo from './todo';
import todos from './todos';
import auth from './auth';

const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  reduxAsyncConnect,
  auth,
  user,
  todo,
  todos,
});

export default reducers;
