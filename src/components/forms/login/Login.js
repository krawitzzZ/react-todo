import React, { PropTypes } from 'react';
import { Field, reduxForm, propTypes } from 'redux-form';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import validate from './validate';
import './Login.scss';

const usernameField = (field) => (
  <TextField
    {...field.input}
    floatingLabelText="Username"
    className="input"
    errorText={field.meta.touched && field.meta.error}
  />
);

const passwordField = (field) => (
  <TextField
    {...field.input}
    floatingLabelText="Password"
    type="password"
    className="input"
    errorText={field.meta.touched && field.meta.error}
  />
);

export class LoginForm extends React.Component {
  static propTypes = {
    ...propTypes,
    isOpen: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    cancel: PropTypes.func.isRequired,
    loginError: PropTypes.object,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoading && !nextProps.isLoading && !nextProps.loginError) {
      this.props.reset();
    }
  }

  handleKeyboardSubmit(event) {
    if (event.key === 'Enter') {
      this.props.handleSubmit();
    }
  }

  getLoginErrors() {
    const { info } = this.props.loginError;
    let errors = [];

    if (info instanceof Object) {
      for (let prop in info) {
        info[prop].forEach((msg, i) => {
          errors.push(<p key={i} className="login-error">{msg}</p>);
        });
      }

      return errors;
    }

    errors.push(<p key="err" className="login-error">Oops... An error occurred...</p>);

    return errors;
  }

  render() {
    const actions = [
      <RaisedButton
        label="Login"
        primary
        disabled={this.props.invalid}
        onTouchTap={this.props.handleSubmit}
      />,
      <RaisedButton
        label="Cancel"
        onTouchTap={this.props.cancel}
      />,
    ];

    return (
      <Dialog
        title={!this.props.isLoading ? 'Please, log in' : null}
        actions={!this.props.isLoading ? actions : null}
        modal={false}
        autoScrollBodyContent
        open={this.props.isOpen}
        onRequestClose={this.props.cancel}
        className="login-form"
        bodyClassName="login-body"
        actionsContainerClassName="login-actions"
      >
        {!this.props.isLoading ?
          <form
            onKeyPress={::this.handleKeyboardSubmit}
            onSubmit={this.props.handleSubmit}
          >
            {this.props.loginError && ::this.getLoginErrors(this.props.loginError)}
            <Field name="username" component={usernameField} />
            <br />
            <Field name="password" component={passwordField} />
          </form> :
          <CircularProgress className="circular" size={150} thickness={15} />
        }
      </Dialog>
    );
  }
}

LoginForm = reduxForm({
  form: 'login',
  validate
})(LoginForm);

export default LoginForm;
