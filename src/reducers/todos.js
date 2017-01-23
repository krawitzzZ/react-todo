const ADD_TODO = 'rr/todos/ADD_TODO';
const TOGGLE_TODO = 'rr/todos/TOGGLE_TODO';

const initTodos = [
  {
    id: 1,
    title: 'aweqwfwfasfwfqwfafawfawfwf',
    description: 'lorem ipsum',
    completed: false,
  },
  {
    id: 2,
    title: 'todo1',
    description: 'loragasggwwgem ipsum',
    completed: false,
  },
  {
    id: 3,
    title: 'todo2',
    description: 'ssssfwwq fqwgqwgasg',
    completed: false,
  },
  {
    id: 4,
    title: 'todo3',
    description: 'wfwasf wqf qw sa',
    completed: false,
  },
  {
    id: 5,
    title: 'todo4',
    description: 'qwd wqd afw qf ',
    completed: false,
  },
  {
    id: 6,
    title: 'todo4',
    description: 'qwd wqd afw wqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqfas f qfa fgqwgasnkifnaksfjaisfj asfaiofhkjdiju asidqopwjhwifjqajfgpoj apjfqiwfgjpqajnbnsfpawf asfijqwpofjapgpojzopj jaspjfgpogjpqwiehnhpwq qf ',
    completed: false,
  },
  {
    id: 7,
    title: 'todo4',
    description: 'qwd wqd afw qf ',
    completed: false,
  },
  {
    id: 8,
    title: 'todo4',
    description: 'qwd wqd afw qf ',
    completed: false,
  },
  {
    id: 9,
    title: 'todo4',
    description: 'qwd wqd afw qf ',
    completed: false,
  },
];

export default function todos(state = initTodos, action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        { ...action.data.todo },
      ];

    case TOGGLE_TODO:
      return state.map((todo) => {
        if (todo.id === action.data.id) {
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

export function toggleTodo(id) {
  return {
    type: TOGGLE_TODO,
    data: { id },
  };
}