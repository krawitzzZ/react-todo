import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import { Todo } from '../';

export class TodoList extends React.PureComponent {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    toggleTodo: PropTypes.func.isRequired,
    openTodoEditor: PropTypes.func.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    todos: [],
  };

  render() {
    return (
      <Paper className={this.props.className} zDepth={0}>
        {this.props.todos.map((todo, index) => (
          <Todo
            todo={todo}
            key={index}
            toggleCompleted={() => this.props.toggleTodo(todo.id)}
            openTodoEditor={() => this.props.openTodoEditor(todo)}
          />
        ))}
      </Paper>
    );
  }
}

export default TodoList;
