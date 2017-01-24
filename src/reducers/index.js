import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import user from './user';
import todo from './todo';
import todos from './todos';

const reducers = combineReducers({
  form: formReducer,
  user,
  todo,
  todos,
});

export default reducers;
