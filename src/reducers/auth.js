import storage from '../utils/storage';

const CLEAN_ERRORS = 'rr/auth/CLEAN_ERRORS';

const RECEIVE_TOKEN = 'rr/auth/RECEIVE_TOKEN';
const RECEIVE_TOKEN_SUCCESS = 'rr/auth/RECEIVE_TOKEN_SUCCESS';
const RECEIVE_TOKEN_FAIL = 'rr/auth/RECEIVE_TOKEN_FAIL';

const UPDATE_TOKEN = 'rr/auth/UPDATE_TOKEN';
const UPDATE_TOKEN_SUCCESS = 'rr/auth/UPDATE_TOKEN_SUCCESS';
const UPDATE_TOKEN_FAIL = 'rr/auth/UPDATE_TOKEN_FAIL';

const LOAD_USER = 'rr/auth/LOAD_USER';
const LOAD_USER_SUCCESS = 'rr/auth/LOAD_USER_SUCCESS';
const LOAD_USER_FAIL = 'rr/auth/LOAD_USER_FAIL';

const SIGN_UP = 'rr/auth/SIGN_UP';
const SIGN_UP_SUCCESS = 'rr/auth/SIGN_UP_SUCCESS';
const SIGN_UP_FAIL = 'rr/auth/SIGN_UP_FAIL';

const DESTROY_TOKEN = 'rr/auth/DESTROY_TOKEN';

const initAuth = {
  user: null,
  userError: null,
  tokenError: null,
  tokenUpdateError: null,
  signUpError: null,
  loadingUser: false,
  loadingToken: false,
  loadingTokenUpdate: false,
  loadingSignUp: false,
  authenticated: Boolean(storage.get('JWT')),
};

export default function auth(state = initAuth, action) {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        loadingUser: true,
        userError: null,
      };

    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loadingUser: false,
        user: action.data.user,
      };

    case LOAD_USER_FAIL:
      return {
        ...state,
        user: null,
        loadingUser: false,
        userError: action.error,
        authenticated: action.error.code !== 401
      };

    case SIGN_UP:
      return {
        ...state,
        loadingSignUp: true,
        signUpError: null,
      };

    case SIGN_UP_SUCCESS:
      action.data.token && storage.set('JWT', action.data.token);

      return {
        ...state,
        loadingSignUp: false,
        user: action.data.user,
      };

    case SIGN_UP_FAIL:
      return {
        ...state,
        user: null,
        loadingSignUp: false,
        signUpError: action.error,
      };

    case RECEIVE_TOKEN:
      return {
        ...state,
        loadingToken: true,
        tokenError: null,
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
        ...state,
        user: null,
        loadingToken: false,
        tokenError: action.error,
      };

    case UPDATE_TOKEN:
      return {
        ...state,
        loadingTokenUpdate: true,
        tokenUpdateError: null,
      };

    case UPDATE_TOKEN_SUCCESS:
      action.data.token && storage.set('JWT', action.data.token);

      return {
        ...state,
        loadingTokenUpdate: false,
        authenticated: Boolean(action.data.token),
      };

    case UPDATE_TOKEN_FAIL:
      return {
        ...state,
        user: null,
        loadingTokenUpdate: false,
        tokenUpdateError: action.error,
      };

    case CLEAN_ERRORS:
      return {
        ...state,
        userError: null,
        tokenError: null,
        tokenUpdateError: null,
        signUpError: null,
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
  return Boolean(globalState && globalState.auth.user);
}

export function loadUser() {
  return {
    types: [LOAD_USER, LOAD_USER_SUCCESS, LOAD_USER_FAIL],
    promise: (api) => api.get(`/users/me`),
  };
}

export function receiveToken(data) {
  return {
    types: [RECEIVE_TOKEN, RECEIVE_TOKEN_SUCCESS, RECEIVE_TOKEN_FAIL],
    promise: (api) => api.post(`/auth`, { data }),
  };
}

export function updateToken() {
  const data = { token: storage.get('JWT') };

  return {
    types: [UPDATE_TOKEN, UPDATE_TOKEN_SUCCESS, UPDATE_TOKEN_FAIL],
    promise: (api) => api.post(`/auth-token-refresh`, { data }),
  };
}

export function signUp(data) {
  return {
    types: [SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_FAIL],
    promise: (api) => api.post(`/users`, { data }),
  };
}

export function cleanErrors() {
  return {
    type: CLEAN_ERRORS,
  };
}

export function destroyToken() {
  return {
    type: DESTROY_TOKEN,
  };
}
