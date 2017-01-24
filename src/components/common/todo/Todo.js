import React, { PropTypes } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { greenA100 } from 'material-ui/styles/colors';
import styles from './styles';
import './Todo.css';

export class Todo extends React.PureComponent {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    toggleCompleted: PropTypes.func.isRequired,
    openTodoEditor: PropTypes.func.isRequired,
  };

  static defaultProps = {
    todo: {},
  };

  render() {
    return (
      <Card style={{backgroundColor: this.props.todo.completed ? greenA100 : ''}} className="card">
        <CardHeader titleStyle={styles.title} title={this.props.todo.title}/>
        <CardText className="card-text">
          {this.props.todo.description}
        </CardText>
        <CardActions className="card-actions">
          {this.props.todo.completed ?
            <FlatButton onClick={this.props.toggleCompleted} label="Cancel Completion"/> :
            <FlatButton onClick={this.props.toggleCompleted} primary={true} label="Complete"/>
          }
          <FlatButton onClick={this.props.openTodoEditor} label="Edit"/>
        </CardActions>
      </Card>
    );
  }
}

export default Todo;
