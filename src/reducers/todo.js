const TOGGLE_TODO_EDITOR_FOR_ADDING = 'rr/todo/TOGGLE_TODO_EDITOR_FOR_ADDING';
const TOGGLE_TODO_EDITOR_FOR_EDITING = 'rr/todo/TOGGLE_TODO_EDITOR_FOR_EDITING';
const CLOSE_TODO_EDITOR = 'rr/todo/CLOSE_TODO_EDITOR';

const FETCH = 'rr/todo/FETCH';
const FETCH_SUCCESS = 'rr/todo/FETCH_SUCCESS';
const FETCH_ERROR = 'rr/todo/FETCH_ERROR';

const initTodo = {
  isEditorOpen: false,
  title: '',
  description: ''
};

export default function todo(state = initTodo, action) {
  switch (action.type) {
    case TOGGLE_TODO_EDITOR_FOR_ADDING:
      return {
        ...state,
        isEditorOpen: true,
      };

    case TOGGLE_TODO_EDITOR_FOR_EDITING:
      return {
        ...state,
        ...action.data.todo,
        isEditorOpen: true,
      };

    case CLOSE_TODO_EDITOR:
      return {
        ...initTodo
      };

    case FETCH:
      console.log('fetching... ', action);
      return state;

    case FETCH_SUCCESS:
      console.log('fetching success... ', action);
      return state;

    case FETCH_ERROR:
      console.log('fetching error... ', action);
      return state;

    default:
      return state;
  }
}

export function toggleTodoEditorForAdding() {
  return {
    type: TOGGLE_TODO_EDITOR_FOR_ADDING,
  };
}

export function toggleTodoEditorForEditing(todo) {
  return {
    type: TOGGLE_TODO_EDITOR_FOR_EDITING,
    data: { todo }
  };
}

export function closeTodoEditor() {
  return {
    type: CLOSE_TODO_EDITOR,
  };
}

export function fetchGoogle() {
  return {
    types: [FETCH, FETCH_SUCCESS, FETCH_ERROR],
    promise: (api) => api.get('/')
  }
}
