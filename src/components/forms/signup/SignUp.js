import React, { PropTypes } from 'react';
import { Fields, reduxForm, propTypes } from 'redux-form';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import renderFields from './fields';
import validate from './validate';
import './SignUp.scss';

export class SignUpForm extends React.Component {
  static propTypes = {
    ...propTypes,
    isOpen: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    cancel: PropTypes.func.isRequired,
    signUpError: PropTypes.object,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoading && !nextProps.isLoading && !nextProps.signUpError) {
      this.props.reset();
    }
  }

  handleKeyboardSubmit(event) {
    if (event.key === 'Enter') {
      this.props.handleSubmit();
    }
  }

  getSignUpErrors() {
    const { info } = this.props.signUpError;
    let errors = [];

    if (info instanceof Object) {
      for (let prop in info) {
        info[prop].forEach((msg, i) => {
          errors.push(<p key={i} className="signup-error">{msg}</p>);
        });
      }

      return errors;
    }

    errors.push(<p key="err" className="signup-error">Oops... An error occurred...</p>);

    return errors;
  }

  render() {
    const fields = [
      'first_name', 'last_name', 'email',
      'username', 'password', 'repeatPassword'
    ];
    const actions = [
      <RaisedButton
        label="Sign Up"
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
        title={!this.props.isLoading ? 'Sign Up Form' : null}
        actions={!this.props.isLoading ? actions : null}
        modal={false}
        autoScrollBodyContent
        open={this.props.isOpen}
        onRequestClose={this.props.cancel}
        className="signup-form"
        bodyClassName="signup-body"
        actionsContainerClassName="signup-actions"
      >
        {!this.props.isLoading ?
          <form
            onKeyPress={::this.handleKeyboardSubmit}
            onSubmit={this.props.handleSubmit}
          >
            {this.props.signUpError && ::this.getSignUpErrors()}
            <Fields names={fields} component={renderFields} />
          </form> :
          <CircularProgress className="circular" size={150} thickness={15} />
        }
      </Dialog>
    );
  }
}

SignUpForm = reduxForm({
  form: 'signup',
  validate
})(SignUpForm);

export default SignUpForm;
