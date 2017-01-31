import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import { AuthenticatedDropMenu } from '../../stateless';
import * as authActions from '../../../reducers/auth';
import './App.css';

export class App extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    receiveToken: PropTypes.func.isRequired,
  };

  login() {
    this.props.receiveToken({
      username: 'developer',
      password: 'asdqweasd'
    });
  }

  signOut() {
    console.log('sign-out');
  }

  openAccount() {
    console.log('account settings');
  }

  render() {
    return (
      <div className="App">
        <AppBar
          style={{ height: 64 }}
          title="rR"
          showMenuIconButton={false}
          iconElementRight={this.props.authenticated ?
                            <AuthenticatedDropMenu
                              openAccount={::this.openAccount}
                              signOut={::this.signOut}
                            /> :
                            <FlatButton onClick={::this.login} label="Login"/>}
        />
        <div className="App-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.auth.user,
    isAuthenticated: state.auth.authenticated,
  }),
  {
    receiveToken: authActions.receiveToken,
  }
)(App);
