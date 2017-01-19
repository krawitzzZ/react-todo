import { combineReducers } from 'redux';
import user from './user';
import todos from './todos';

const reducer = combineReducers({
                                  user,
                                  todos
                                });

export default reducer;
