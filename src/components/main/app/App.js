import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import { Todos } from '../../main';
import { AuthenticatedDropMenu } from '../../stateless';
import './App.css';


export class App extends React.Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.signOut = this.signOut.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.openAccount = this.openAccount.bind(this);
  }

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
                              openAccount={this.openAccount}
                              signOut={this.signOut}
                            /> :
                            <FlatButton onClick={this.login} label="Login"/>}
        />
        <div className="App-content">
          <Todos />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object.isRequired,
};

App.defaultProps = {
  user: {
    username: 'anonymous',
    email: 'anon@example.com',
    authenticated: true,
  },
};

export default App;
