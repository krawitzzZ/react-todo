import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Add from 'material-ui/svg-icons/content/add-circle';
import All from 'material-ui/svg-icons/action/reorder';
import Completed from 'material-ui/svg-icons/action/check-circle';
import Uncompleted from 'material-ui/svg-icons/content/remove-circle';
import { TodoList } from '../../common';
import * as todoActions from '../../../reducers/todos';
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
      selected: 1
    };

    this.toggleTodo = this.toggleTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.changefilter = this.changefilter.bind(this);
    this.getVisibleTodos = this.getVisibleTodos.bind(this);
  }

  changefilter(filter) {
    this.setState({
      selected: filter
    });
  }

  toggleTodo(id) {
    this.props.toggleTodo(id);
  }

  editTodo() {
    console.log('edit todo');
  }

  getVisibleTodos() {
    const todos = this.props.todos;
    switch (this.state.selected) {
      case this.state.filters.SHOW_ALL:
        return todos;
      case this.state.filters.SHOW_COMPLETED:
        return todos.filter(todo => todo.completed);
      case this.state.filters.SHOW_UNCOMPLETED:
        return todos.filter(todo => !todo.completed);
    }
  }

  render() {
    return (
      <div className="Todos">
        <Paper className="paper" zDepth={0}>
          <TodoList
            className="paper"
            todos={this.getVisibleTodos()}
            toggleTodo={this.toggleTodo}
            editTodo={this.editTodo}
          />
        </Paper>
        <Paper className="paper-footer" zDepth={5}>
          <BottomNavigation selectedIndex={this.state.selected}>
            <BottomNavigationItem
              className="add-todo-btn"
              label="Add Todo"
              icon={<Add />}
              onTouchTap={() => console.log('add')}
            />
            <BottomNavigationItem
              label="Show All"
              icon={<All />}
              onTouchTap={() => this.changefilter(this.state.filters.SHOW_ALL)}
            />
            <BottomNavigationItem
              label="Show Completed"
              icon={<Completed />}
              onTouchTap={() => this.changefilter(this.state.filters.SHOW_COMPLETED)}
            />
            <BottomNavigationItem
              label="Show Uncompleted"
              icon={<Uncompleted />}
              onTouchTap={() => this.changefilter(this.state.filters.SHOW_UNCOMPLETED)}
            />
          </BottomNavigation>
        </Paper>
      </div>
    );
  }
}

Todos.propTypes = {
  todos: PropTypes.array.isRequired,
  toggleTodo: PropTypes.func.isRequired,
};

Todos.defaultProps = {
  todos: [],
};

export default connect(
  state => ({ todos: state.todos }),
  { toggleTodo: todoActions.toggleTodo }
)(Todos);
