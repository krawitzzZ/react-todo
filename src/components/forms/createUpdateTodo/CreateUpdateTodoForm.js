import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, propTypes } from 'redux-form';
import { Card, CardActions, CardTitle } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import validate from './validate';
import './CreateUpdateTodoForm.css';

const titleField = (field) => (
  <TextField
    {...field.input}
    floatingLabelText="Title"
    className="input"
    errorText={field.meta.touched && field.meta.error}
  />
);

const descriptionField = (field) => (
  <TextField
    {...field.input}
    multiLine
    rows={1}
    rowsMax={5}
    floatingLabelText="Description"
    floatingLabelStyle={{left: 0}}
    className="input"
    errorText={field.meta.touched && field.meta.error}
  />
);

export class CreateUpdateTodoForm extends React.Component {
  static propTypes = {
    ...propTypes,
    cancel: PropTypes.func.isRequired,
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Paper zDepth={5}>
          <Card className="p-m">
            <CardTitle className="bold" title="Todo"/>
            <Field
              name="title"
              component={titleField}
            />
            <br />
            <Field name="description" component={descriptionField} />
            <CardActions className="m-t-m">
              <FlatButton
                primary
                label={this.props.initialValues.id ? 'Update Todo' : 'Create Todo'}
                onTouchTap={this.props.handleSubmit}
                disabled={this.props.invalid}
              />
              <FlatButton
                label="Cancel"
                onTouchTap={this.props.cancel}
              />
            </CardActions>
          </Card>
        </Paper>
      </form>
    );
  }
}

CreateUpdateTodoForm = reduxForm({
  form: 'todo',
  validate,
})(CreateUpdateTodoForm);


CreateUpdateTodoForm = connect(
  state => ({
    initialValues: {
      id: state.todo.id,
      title: state.todo.title,
      description: state.todo.description,
    },
  })
)(CreateUpdateTodoForm);

export default CreateUpdateTodoForm;
