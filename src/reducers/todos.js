const ADD_TODO = 'rr/ADD_TODO';
const TOGGLE_TODO = 'rr/TOGGLE_TODO';

const initTodos = [
  {
    title: 'aweqwfwfasfwfqwfafawfawfwf',
    description: 'lorem ipsum',
    completed: false,
  },
  {
    title: 'todo1',
    description: 'loragasggwwgem ipsum',
    completed: false,
  },
  {
    title: 'todo2',
    description: 'ssssfwwq fqwgqwgasg',
    completed: false,
  },
  {
    title: 'todo3',
    description: 'wfwasf wqf qw sa',
    completed: false,
  },
  {
    title: 'todo4',
    description: 'qwd wqd afw qf ',
    completed: false,
  },
  {
    title: 'todo4',
    description: 'qwd wqd afw wqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqfas f qfa fgqwgasnkifnaksfjaisfj asfaiofhkjdiju asidqopwjhwifjqajfgpoj apjfqiwfgjpqajnbnsfpawf asfijqwpofjapgpojzopj jaspjfgpogjpqwiehnhpwq qf ',
    completed: false,
  },
  {
    title: 'todo4',
    description: 'qwd wqd afw qf ',
    completed: false,
  },
  {
    title: 'todo4',
    description: 'qwd wqd afw qf ',
    completed: false,
  },
  {
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
