import React, { PropTypes } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import styles from './styles';
import './Todo.css';

export class Todo extends React.PureComponent {
  render() {
    return (
      <Card className="card">
        <CardHeader titleStyle={styles.title} title={this.props.todo.title}/>
        <CardText className="card-text">
          {this.props.todo.description}
        </CardText>
        <CardActions className="card-actions">
          {this.props.todo.completed ?
            <FlatButton onClick={this.props.toggleCompleted} label="Cancel Complete"/> :
            <FlatButton onClick={this.props.toggleCompleted} primary={true} label="Complete"/>
          }
          <FlatButton onClick={this.props.edit} label="Edit"/>
        </CardActions>
      </Card>
    );
  }
}

Todo.propTypes = {
  todo: PropTypes.object.isRequired,
  toggleCompleted: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
};

export default Todo;
