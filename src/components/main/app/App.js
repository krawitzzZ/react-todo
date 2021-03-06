import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import { push } from 'react-router-redux';
import AppBar from 'material-ui/AppBar';
import { AuthenticatedDropMenu, UnAuthenticatedActions } from '../../stateless';
import { LoginForm, SignUpForm } from '../../forms';
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
    isLoadingSignUp: PropTypes.bool.isRequired,
    user: PropTypes.object,
    loginError: PropTypes.object,
    signUpError: PropTypes.object,
    pushState: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,
    refreshToken: PropTypes.func.isRequired,
    cleanErrors: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.refreshToken();
    }

    if (this.props.user) {
      this.props.pushState('/todos');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isAuthenticated && nextProps.isAuthenticated) {
      this.closeLoginModal();
      this.closeSignUpModal();
      this.props.loadUser();
      this.props.pushState('/todos');
    }

    if (this.props.user && !nextProps.user) {
      this.props.pushState('/');
    }
  }

  signUp(credentials) {
    this.props.signUp(credentials);
  }

  login(credentials) {
    this.props.login(credentials);
  }

  signOut() {
    this.props.logout();
  }

  openLoginModal() {
    this.setState({ isLoginModalOpen: true });
  }

  closeLoginModal() {
    this.setState({ isLoginModalOpen: false });
    this.props.cleanErrors();
  }

  openSignUpModal() {
    this.setState({ isSignUpModalOpen: true });
  }

  closeSignUpModal() {
    this.setState({ isSignUpModalOpen: false });
    this.props.cleanErrors();
  }

  render() {
    return (
      <div className="App">
        <AppBar
          style={{ height: 64 }}
          title="Todos"
          showMenuIconButton={false}
          iconElementRight={this.props.isAuthenticated ?
                            <AuthenticatedDropMenu
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
            loginError={this.props.loginError}
          />
          <SignUpForm
            isOpen={this.state.isSignUpModalOpen}
            isLoading={this.props.isLoadingSignUp}
            cancel={::this.closeSignUpModal}
            onSubmit={::this.signUp}
            signUpError={this.props.signUpError}
          />
        </div>
      </div>
    );
  }
}

const ConnectedApp = connect(
  state => ({
    user: state.auth.user,
    loginError: state.auth.tokenError,
    signUpError: state.auth.signUpError,
    isAuthenticated: state.auth.authenticated,
    isLoadingToken: state.auth.loadingToken,
    isLoadingSignUp: state.auth.loadingSignUp,
  }),
  {
    pushState: push,
    login: authActions.receiveToken,
    signUp: authActions.signUp,
    logout: authActions.destroyToken,
    loadUser: authActions.loadUser,
    refreshToken: authActions.updateToken,
    cleanErrors: authActions.cleanErrors,
  }
)(App);

export default asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    const state = getState();
    const { authenticated, loadingUser } = state.auth;

    if (authenticated && !authActions.isUserLoaded(state) && !loadingUser) {
      promises.push(dispatch(authActions.loadUser()));
    }

    return Promise.all(promises);
  },
}])(ConnectedApp);
