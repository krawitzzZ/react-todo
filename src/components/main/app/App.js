import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import { AuthenticatedDropMenu } from '../../stateless';
import './App.css';


export class App extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
  };

  static defaultProps = {
    user: {
      username: 'anonymous',
      email: 'anon@example.com',
      authenticated: true,
    },
  };

  login() {
    console.log('login');
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
          iconElementRight={this.props.user.authenticated ?
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

export default App;
