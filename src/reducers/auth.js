import storage from '../utils/storage';

const RECEIVE_TOKEN = 'rr/auth/RECEIVE_TOKEN';
const RECEIVE_TOKEN_SUCCESS = 'rr/auth/RECEIVE_TOKEN_SUCCESS';
const RECEIVE_TOKEN_FAIL = 'rr/auth/RECEIVE_TOKEN_FAIL';

const LOAD_USER = 'rr/auth/LOAD_USER';
const LOAD_USER_SUCCESS = 'rr/auth/LOAD_USER_SUCCESS';
const LOAD_USER_FAIL = 'rr/auth/LOAD_USER_FAIL';

const DESTROY_TOKEN = 'rr/auth/DESTROY_TOKEN';

const initAuth = {
  error: null,
  user: null,
  loadingUser: false,
  loadingToken: false,
  authenticated: Boolean(storage.get('JWT'))
};

export default function auth(state = initAuth, action) {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        error: null,
        loadingUser: true,
      };

    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loadingUser: false,
        user: action.data.user,
      };

    case LOAD_USER_FAIL:
      return {
        ...initAuth,
        error: action.error
      };

    case RECEIVE_TOKEN:
      return {
        ...state,
        error: null,
        loadingToken: true,
      };

    case RECEIVE_TOKEN_SUCCESS:
      action.data.token && storage.set('JWT', action.data.token);
      return {
        ...state,
        loadingToken: false,
        authenticated: Boolean(action.data.token),
      };

    case RECEIVE_TOKEN_FAIL:
      return {
        ...initAuth,
        error: action.error
      };

    case DESTROY_TOKEN:
      storage.remove('JWT');
      return {
        ...initAuth,
        authenticated: false
      };

    default:
      return state;
  }
}

export function isUserLoaded(globalState) {
  return globalState && globalState.auth.user;
}

export function loadUser() {
  return {
    types: [LOAD_USER, LOAD_USER_SUCCESS, LOAD_USER_FAIL],
    promise: (api) => api.get('/users/me'),
  };
}

export function receiveToken(data) {
  return {
    types: [RECEIVE_TOKEN, RECEIVE_TOKEN_SUCCESS, RECEIVE_TOKEN_FAIL],
    promise: (api) => api.post('/auth', { data }),
  };
}

export function destroyToken() {
  return {
    type: DESTROY_TOKEN,
  };
}
