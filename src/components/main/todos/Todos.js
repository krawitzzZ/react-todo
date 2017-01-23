import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import Add from 'material-ui/svg-icons/content/add-circle';
import All from 'material-ui/svg-icons/action/reorder';
import Completed from 'material-ui/svg-icons/action/check-circle';
import Uncompleted from 'material-ui/svg-icons/content/remove-circle';
import { Todo } from '../../common';
import * as todoActions from '../../../reducers/todos';
import styles from './styles';
import './Todos.css';

export class Todos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
    };

    this.toggleTodo = this.toggleTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
  }

  toggleTodo(index) {
    console.log('toggle todo');
    this.props.toggleTodo(index);
  }

  editTodo() {
    console.log('edit todo');
  }

  render() {
    console.log(this.props);
    return (
      <div className="Todos">
        <Paper style={styles.paper} zDepth={0}>
          {this.props.todos.map((todo, index) => (
            <Todo
              todo={todo}
              key={index}
              toggleCompleted={this.toggleTodo.bind(this, index)}
              edit={this.editTodo}
            />
          ))}
        </Paper>
        <Paper style={styles.footerPaper} zDepth={5}>
          <BottomNavigation selectedIndex={this.state.selectedIndex}>
            <BottomNavigationItem
              label="Add Todo"
              icon={<Add />}
              onTouchTap={() => console.log('add')}
            />
            <BottomNavigationItem
              label="Show All"
              icon={<All />}
              onTouchTap={() => console.log('all')}
            />
            <BottomNavigationItem
              label="Show Completed"
              icon={<Completed />}
              onTouchTap={() => console.log('completed')}
            />
            <BottomNavigationItem
              label="Show Uncompleted"
              icon={<Uncompleted />}
              onTouchTap={() => console.log('uncompleted')}
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
