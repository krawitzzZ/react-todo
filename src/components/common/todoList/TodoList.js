import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import { Todo } from '../';

export class TodoList extends React.PureComponent {
  render() {
    return (
      <Paper className={this.props.className} zDepth={0}>
        {this.props.todos.map((todo, index) => (
          <Todo
            todo={todo}
            key={index}
            toggleCompleted={() => this.props.toggleTodo(todo.id)}
            edit={this.props.editTodo}
          />
        ))}
      </Paper>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  className: PropTypes.string,
};

TodoList.defaultProps = {
  todos: [],
};

export default TodoList;
