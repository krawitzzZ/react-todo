const LOAD_TODOS = 'rr/todos/LOAD_TODOS';
const LOAD_TODOS_SUCCESS = 'rr/todos/LOAD_TODOS_SUCCESS';
const LOAD_TODOS_FAIL = 'rr/todos/LOAD_TODOS_FAIL';

const ADD_TODO = 'rr/todos/ADD_TODO';
const ADD_TODO_SUCCESS = 'rr/todos/ADD_TODO_SUCCESS';
const ADD_TODO_FAIL = 'rr/todos/ADD_TODO_FAIL';

const EDIT_TODO = 'rr/todos/EDIT_TODO';
const EDIT_TODO_SUCCESS = 'rr/todos/EDIT_TODO_SUCCESS';
const EDIT_TODO_FAIL = 'rr/todos/EDIT_TODO_FAIL';

const TOGGLE_TODO = 'rr/todos/TOGGLE_TODO';
const TOGGLE_TODO_SUCCESS = 'rr/todos/TOGGLE_TODO_SUCCESS';
const TOGGLE_TODO_FAIL = 'rr/todos/TOGGLE_TODO_FAIL';

const DELETE_TODO = 'rr/todos/DELETE_TODO';
const DELETE_TODO_SUCCESS = 'rr/todos/DELETE_TODO_SUCCESS';
const DELETE_TODO_FAIL = 'rr/todos/DELETE_TODO_FAIL';

const initTodos = {
  loadingTodos: false,
  loadingAddTodo: false,
  loadingEditTodo: false,
  loadingToggleTodo: false,
  loadingDeleteTodo: false,
  loadingError: null,
  addTodoError: null,
  editTodoError: null,
  toggleTodoError: null,
  toggleDeleteError: null,
  list: [],
};

export default function todos(state = initTodos, action) {
  let todo;
  let list;
  let index;

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
      todo = action.data;
      list = state.list.map(item => item);
      index = list.findIndex(item => item.id === todo.id);
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

    case TOGGLE_TODO:
      return {
        ...state,
        loadingToggleTodo: true,
        toggleTodoError: null,
      };

    case TOGGLE_TODO_SUCCESS:
      todo = action.data;
      list = state.list.map(item => item);
      index = list.findIndex(item => item.id === todo.id);
      list.splice(index, 1, todo);

      return {
        ...state,
        loadingToggleTodo: false,
        list
      };

    case TOGGLE_TODO_FAIL:
      return {
        ...state,
        loadingToggleTodo: false,
        toggleTodoError: action.error,
      };

    case DELETE_TODO:
      return {
        ...state,
        loadingDeleteTodo: true,
        toggleDeleteError: null,
      };

    case DELETE_TODO_SUCCESS:
      todo = action.payload.todo;
      list = state.list.map(item => item);
      index = list.findIndex(item => item.id === todo.id);
      list.splice(index, 1);

      return {
        ...state,
        loadingDeleteTodo: false,
        list
      };

    case DELETE_TODO_FAIL:
      return {
        ...state,
        loadingDeleteTodo: false,
        toggleDeleteError: action.error,
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

export function toggleTodo(todo) {
  return {
    types: [TOGGLE_TODO, TOGGLE_TODO_SUCCESS, TOGGLE_TODO_FAIL],
    promise: (api) => api.patch(`/todos/${todo.id}`, {
      data: {
        completed: !todo.completed,
      }
    }),
  };
}

export function deleteTodo(todo) {
  return {
    types: [DELETE_TODO, DELETE_TODO_SUCCESS, DELETE_TODO_FAIL],
    promise: (api) => api.del(`/todos/${todo.id}`),
    payload: { todo },
  };
}
