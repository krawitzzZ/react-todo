import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Add from 'material-ui/svg-icons/content/add-circle';
import All from 'material-ui/svg-icons/action/reorder';
import Completed from 'material-ui/svg-icons/action/check-circle';
import Uncompleted from 'material-ui/svg-icons/content/remove-circle';
import { TodoList } from '../../common';
import { CreateUpdateTodoForm } from '../../forms';
import * as todosActions from '../../../reducers/todos';
import * as todoActions from '../../../reducers/todo';
import './Todos.css';

export class Todos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: {
        SHOW_ALL: 1,
        SHOW_COMPLETED: 2,
        SHOW_UNCOMPLETED: 3,
      },
      selected: 1,
    };
  }

  static propTypes = {
    isTodoEditorOpen: PropTypes.bool.isRequired,
    todos: PropTypes.array.isRequired,
    toggleTodoEditorForAdding: PropTypes.func.isRequired,
    toggleTodoEditorForEditing: PropTypes.func.isRequired,
    closeTodoEditor: PropTypes.func.isRequired,
    addTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isTodoEditorOpen: false,
    todos: [],
  };

  changeFilter = (filter) => {
    this.setState({ selected: filter });
  };

  getVisibleTodos = () => {
    const todos = this.props.todos;
    const state = this.state;

    switch (state.selected) {
      case state.filters.SHOW_ALL:
        return todos;
      case state.filters.SHOW_COMPLETED:
        return todos.filter(todo => todo.completed);
      case state.filters.SHOW_UNCOMPLETED:
        return todos.filter(todo => !todo.completed);
    }
  };

  openTodoEditorForAdding = () => {
    this.props.toggleTodoEditorForAdding();
  };

  openTodoEditorForEditing = (todo) => {
    this.props.toggleTodoEditorForEditing(todo);
  };

  closeTodoEditor = () => {
    this.todoForm.classList.remove('expanded');
    setTimeout(() => this.props.closeTodoEditor(), 600);
  };

  addTodo = (todo) => {
    todo.id = Math.floor(Math.random() * 10000000 + Math.random() * 10000000);
    this.props.addTodo(todo);
  };

  editTodo = (todo) => {
    this.props.editTodo(todo);
  };

  deleteTodo = (id) => {
    this.props.deleteTodo(id);
  };

  toggleTodo = (id) => {
    this.props.toggleTodo(id);
  };

  createUpdateTodo = (todo) => {
    if (todo.id) {
      this.closeTodoEditor();
      return this.editTodo(todo);
    }

    this.closeTodoEditor();
    this.addTodo(todo);
  };

  render() {
    return (
      <div className="Todos">
        <Paper className="paper" zDepth={0}>
          <TodoList
            className="paper"
            todos={this.getVisibleTodos()}
            toggleTodo={this.toggleTodo}
            openTodoEditor={this.openTodoEditorForEditing}
            deleteTodo={this.deleteTodo}
          />
        </Paper>
        <Paper className="paper-footer" zDepth={5}>
          <BottomNavigation selectedIndex={this.state.selected}>
            <BottomNavigationItem
              className="add-todo-btn"
              label="Add Todo"
              icon={<Add color={'rgb(0, 188, 212)'}/>}
              onTouchTap={this.openTodoEditorForAdding}
            />
            <BottomNavigationItem
              label="Show All"
              icon={<All />}
              onTouchTap={() => this.changeFilter(this.state.filters.SHOW_ALL)}
            />
            <BottomNavigationItem
              label="Show Completed"
              icon={<Completed />}
              onTouchTap={() => this.changeFilter(this.state.filters.SHOW_COMPLETED)}
            />
            <BottomNavigationItem
              label="Show Uncompleted"
              icon={<Uncompleted />}
              onTouchTap={() => this.changeFilter(this.state.filters.SHOW_UNCOMPLETED)}
            />
          </BottomNavigation>
        </Paper>
        <div
          ref={(div) => {this.todoForm = div;}}
          className={`add-todo-card ${this.props.isTodoEditorOpen ? 'expanded' : ''}`}
        >
          {this.props.isTodoEditorOpen &&
            <CreateUpdateTodoForm
              onSubmit={this.createUpdateTodo}
              cancel={this.closeTodoEditor}
            />
          }
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    isTodoEditorOpen: state.todo.isEditorOpen,
    todos: state.todos,
  }),
  {
    toggleTodoEditorForAdding: todoActions.toggleTodoEditorForAdding,
    toggleTodoEditorForEditing: todoActions.toggleTodoEditorForEditing,
    closeTodoEditor: todoActions.closeTodoEditor,
    addTodo: todosActions.addTodo,
    editTodo: todosActions.editTodo,
    deleteTodo: todosActions.deleteTodo,
    toggleTodo: todosActions.toggleTodo,
  }
)(Todos);
