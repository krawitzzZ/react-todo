import React, { PropTypes } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import styles from './styles';

export class Todo extends React.PureComponent {
  render() {
    return (
      <Card style={styles.card}>
        <CardHeader titleStyle={styles.title} title={this.props.todo.title}/>
        <CardText style={styles.text}>
          {this.props.todo.description}
        </CardText>
        <CardActions style={styles.actions}>
          {!this.props.todo.completed ?
            <FlatButton onClick={this.props.toggleCompleted} primary={true} label="Complete"/> :
           <div />
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
