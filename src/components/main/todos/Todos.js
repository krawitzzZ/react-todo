import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import { Todo } from '../../common';
import styles from './styles';
import './Todos.css';

const todos = [
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

export class Todos extends React.Component {
  constructor(props) {
    super(props);

    this.toggleTodo = this.toggleTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
  }

  toggleTodo() {
    console.log('toggle todo');
  }

  editTodo() {
    console.log('edit todo');
  }

  render() {
    return (
      <div className="Todos">
        <Paper style={styles.paper} zDepth={0}>
          {this.props.todos.map((todo, index) => (
            <Todo
              todo={todo}
              key={index}
              toggleCompleted={this.toggleTodo}
              edit={this.editTodo}
            />
          ))}
        </Paper>
      </div>
    );
  }
}

Todos.propTypes = {
  todos: PropTypes.array.isRequired,
};

Todos.defaultProps = {
  todos: todos || [],
};

export default Todos;
