import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux'
import user from './user';
import todo from './todo';
import todos from './todos';

const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  user,
  todo,
  todos,
});

export default reducers;
