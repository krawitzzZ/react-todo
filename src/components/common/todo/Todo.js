import React, { PropTypes } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/content/clear';
import { greenA100 } from 'material-ui/styles/colors';
import styles from './styles';
import './Todo.css';

export class Todo extends React.PureComponent {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    toggleCompleted: PropTypes.func.isRequired,
    openTodoEditor: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
  };

  static defaultProps = {
    todo: {},
  };

  render() {
    return (
      <Card style={{backgroundColor: this.props.todo.completed ? greenA100 : ''}} className="card">
        <div className="delete-todo">
          <IconButton tooltip="Delete" onTouchTap={this.props.delete}>
            <Close />
          </IconButton>
        </div>
        <CardHeader titleStyle={styles.title} title={this.props.todo.title}/>
        <CardText className="card-text">
          {this.props.todo.description}
        </CardText>
        <CardActions className="card-actions">
          {this.props.todo.completed ?
            <FlatButton onTouchTap={this.props.toggleCompleted} label="Cancel Completion"/> :
            <FlatButton onTouchTap={this.props.toggleCompleted} primary={true} label="Complete"/>
          }
          <FlatButton onTouchTap={this.props.openTodoEditor} label="Edit"/>
        </CardActions>
      </Card>
    );
  }
}

export default Todo;
