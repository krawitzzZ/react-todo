const ADD_TODO = 'rr/ADD_TODO';
const TOGGLE_TODO = 'rr/TOGGLE_TODO';

const initTodos = [];

function todos(state = initTodos, action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        { ...action.data.todo },
      ];

    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.data.index) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      });

    default:
      return state;
  }
}

export function addTodo(todo) {
  return {
    type: ADD_TODO,
    data: { todo },
  };
}

export function toggleTodo(index) {
  return {
    type: TOGGLE_TODO,
    data: { index },
  };
}


export default todos
