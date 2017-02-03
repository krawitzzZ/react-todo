const LOAD_TODOS = 'rr/todos/LOAD_TODOS';
const LOAD_TODOS_SUCCESS = 'rr/todos/LOAD_TODOS_SUCCESS';
const LOAD_TODOS_FAIL = 'rr/todos/LOAD_TODOS_FAIL';

const ADD_TODO = 'rr/todos/ADD_TODO';
const ADD_TODO_SUCCESS = 'rr/todos/ADD_TODO_SUCCESS';
const ADD_TODO_FAIL = 'rr/todos/ADD_TODO_FAIL';

const EDIT_TODO = 'rr/todos/EDIT_TODO';
const EDIT_TODO_SUCCESS = 'rr/todos/EDIT_TODO_SUCCESS';
const EDIT_TODO_FAIL = 'rr/todos/EDIT_TODO_FAIL';

const DELETE_TODO = 'rr/todos/DELETE_TODO';
const TOGGLE_TODO = 'rr/todos/TOGGLE_TODO';

const initTodos = {
  loadingTodos: false,
  loadingAddTodo: false,
  loadingEditTodo: false,
  loadingError: null,
  addTodoError: null,
  editTodoError: null,
  list: [],
};

export default function todos(state = initTodos, action) {
  switch (action.type) {
    case LOAD_TODOS:
      return {
        ...state,
        loadingTodos: true,
        loadingError: null,
      };

    case LOAD_TODOS_SUCCESS:
      return {
        ...state,
        loadingTodos: false,
        list: action.data.results,
      };

    case LOAD_TODOS_FAIL:
      return {
        ...state,
        loadingTodos: false,
        loadingError: action.error,
      };

    case ADD_TODO:
      return {
        ...state,
        loadingAddTodo: true,
        addTodoError: null,
      };

    case ADD_TODO_SUCCESS:
      return {
        ...state,
        loadingAddTodo: false,
        list: state.list.concat(action.data),
      };

    case ADD_TODO_FAIL:
      return {
        ...state,
        loadingAddTodo: false,
        addTodoError: action.error,
      };

    case EDIT_TODO:
      return {
        ...state,
        loadingEditTodo: true,
        editTodoError: null,
      };

    case EDIT_TODO_SUCCESS:
      const todo = action.data;
      const list = state.list.map(item => item);
      const index = list.findIndex(item => item.id === todo.id);
      list.splice(index, 1, todo);

      return {
        ...state,
        loadingEditTodo: false,
        list
      };

    case EDIT_TODO_FAIL:
      return {
        ...state,
        loadingEditTodo: false,
        editTodoError: action.error,
      };

    default:
      return state;
  }
}

export function fetchTodos() {
  return {
    types: [LOAD_TODOS, LOAD_TODOS_SUCCESS, LOAD_TODOS_FAIL],
    promise: (api) => api.get(`/todos`),
  };
}

export function addTodo(data) {
  return {
    types: [ADD_TODO, ADD_TODO_SUCCESS, ADD_TODO_FAIL],
    promise: (api) => api.post(`/todos`, { data }),
  };
}

export function editTodo(todo) {
  return {
    types: [EDIT_TODO, EDIT_TODO_SUCCESS, EDIT_TODO_FAIL],
    promise: (api) => api.put(`/todos/${todo.id}`, { data: todo }),
  };
}

export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    data: { id },
  };
}

export function toggleTodo(id) {
  return {
    type: TOGGLE_TODO,
    data: { id },
  };
}
