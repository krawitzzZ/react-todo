import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, propTypes } from 'redux-form';
import { Card, CardActions, CardTitle } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
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

const validate = values => {
  const errors = {};

  if (!values.title || !values.title.trim()) {
    errors.title = 'This field can\'t be empty.';
  } else if (values.title.length > 15) {
    errors.title = 'Title must be 15 characters or less';
  }

  if (values.description && values.description.trim() && values.description.length > 150) {
    errors.description = 'Description must be 150 characters or less';
  }

  return errors
};

export class CreateUpdateTodoForm extends React.Component {
  static propTypes = {
    ...propTypes,
    cancel: PropTypes.func.isRequired,
    todo: PropTypes.object,
  };

  static defaultProps = {
    todo: {}
  };

  onSubmit = (data) => {
    for (let prop in data) {
      if (!data.hasOwnProperty(prop) || typeof data[prop] !== 'string') continue;
      data[prop] = data[prop].trim();
    }

    this.props.submit(data);
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
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
                onTouchTap={this.props.handleSubmit(this.onSubmit)}
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
  state => ({ initialValues: state.todo, })
)(CreateUpdateTodoForm);

export default CreateUpdateTodoForm;
