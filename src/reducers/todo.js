const TOGGLE_TODO_EDITOR_FOR_ADDING = 'rr/todo/TOGGLE_TODO_EDITOR_FOR_ADDING';
const TOGGLE_TODO_EDITOR_FOR_EDITING = 'rr/todo/TOGGLE_TODO_EDITOR_FOR_EDITING';
const CLOSE_TODO_EDITOR = 'rr/todo/CLOSE_TODO_EDITOR';

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
