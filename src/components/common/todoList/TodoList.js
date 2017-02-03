import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import { Todo } from '../';
import './TodoList.scss';
import styles from './styles';

export class TodoList extends React.PureComponent {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    toggleTodo: PropTypes.func.isRequired,
    openTodoEditor: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    className: PropTypes.string,
  };

  getEmptyPaper() {
    if (Boolean(this.props.todos.length)) {
      return null;
    }

    return (
      <div className="Todo-list">
        <Paper style={styles.paper} zDepth={3} rounded={false}>
          <h1>There are no todos yet :(</h1>
          <h2>Create one right now!</h2>
        </Paper>
      </div>
    );
  }

  render() {
    return (
      <Paper className={this.props.className} zDepth={0}>
        {Boolean(this.props.todos.length) && this.props.todos.map((todo, index) => (
          <Todo
            todo={todo}
            key={index}
            toggleCompleted={() => this.props.toggleTodo(todo)}
            openTodoEditor={() => this.props.openTodoEditor(todo)}
            delete={() => this.props.deleteTodo(todo)}
          />
        ))}
        {::this.getEmptyPaper()}
      </Paper>
    );
  }
}

export default TodoList;
