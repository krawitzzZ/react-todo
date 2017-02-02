import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import { push } from 'react-router-redux';
import AppBar from 'material-ui/AppBar';
import { AuthenticatedDropMenu, UnAuthenticatedActions } from '../../stateless';
import { LoginForm } from '../../forms';
import * as authActions from '../../../reducers/auth';
import './App.css';

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoginModalOpen: false,
      isSignUpModalOpen: false,
    };
  }

  static propTypes = {
    children: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isLoadingToken: PropTypes.bool.isRequired,
    user: PropTypes.object,
    error: PropTypes.object,
    pushState: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (this.props.user) {
      this.props.pushState('/todos');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isAuthenticated && nextProps.isAuthenticated) {
      this.props.loadUser();
    }

    if (!this.props.user && nextProps.user) {
      this.closeLoginModal();
      this.props.pushState('/todos');
    }

    if (this.props.user && !nextProps.user) {
      this.props.pushState('/');
    }
  }

  login(credentials) {
    this.props.login(credentials);
  }

  signOut() {
    this.props.logout();
  }

  openAccount() {
    console.log('account settings');
  }

  openLoginModal() {
    this.setState({ isLoginModalOpen: true });
  }

  closeLoginModal() {
    this.setState({ isLoginModalOpen: false });
  }

  openSignUpModal() {
    this.setState({ isSignUpModalOpen: true });
  }

  closeSignUpModal() {
    this.setState({ isSignUpModalOpen: false });
  }

  render() {
    return (
      <div className="App">
        <AppBar
          style={{ height: 64 }}
          title="rR"
          showMenuIconButton={false}
          iconElementRight={this.props.user ?
                            <AuthenticatedDropMenu
                              openAccount={::this.openAccount}
                              signOut={::this.signOut}
                            /> :
                            <UnAuthenticatedActions
                              openLoginModal={::this.openLoginModal}
                              openSignUpModal={::this.openSignUpModal}
                            />}
        />
        <div className="App-content">
          {this.props.children}
        </div>
        <div>
          <LoginForm
            isOpen={this.state.isLoginModalOpen}
            isLoading={this.props.isLoadingToken}
            cancel={::this.closeLoginModal}
            onSubmit={::this.login}
            loginError={this.props.error}
          />
        </div>
      </div>
    );
  }
}

const ConnectedApp = connect(
  state => ({
    user: state.auth.user,
    error: state.auth.error,
    isAuthenticated: state.auth.authenticated,
    isLoadingToken: state.auth.loadingToken,
  }),
  {
    pushState: push,
    login: authActions.receiveToken,
    logout: authActions.destroyToken,
    loadUser: authActions.loadUser,
  }
)(App);

export default asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    const state = getState();

    if (state.auth.authenticated && !authActions.isUserLoaded(state) && !state.auth.loadingUser) {
      promises.push(dispatch(authActions.loadUser()));
    }

    return Promise.all(promises);
  },
}])(ConnectedApp);
