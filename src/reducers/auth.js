import storage from '../utils/storage';

const RECEIVE_TOKEN = 'rr/auth/RECEIVE_TOKEN';
const RECEIVE_TOKEN_SUCCESS = 'rr/auth/RECEIVE_TOKEN_SUCCESS';
const RECEIVE_TOKEN_FAIL = 'rr/auth/RECEIVE_TOKEN_FAIL';

const DESTROY_TOKEN = 'rr/auth/DESTROY_TOKEN';

const initUser = {
  user: null,
  error: null,
  loadingToken: false,
  authenticated: false
};

export default function auth(state = initUser, action) {
  switch (action.type) {
    case RECEIVE_TOKEN:
      return {
        ...state,
        error: null,
        loadingToken: true,
      };

    case RECEIVE_TOKEN_SUCCESS:
      storage.set('jwtToken', action.data.token);
      return {
        ...state,
        loadingToken: false,
        authenticated: true,
      };

    case RECEIVE_TOKEN_FAIL:
      console.log(action);
      return {
        ...state,
        loadingToken: true,
      };

    case DESTROY_TOKEN:
      return {
        ...state,
      };

    default:
      return state;
  }
}

export function receiveToken(data) {
  return {
    types: [RECEIVE_TOKEN, RECEIVE_TOKEN_SUCCESS, RECEIVE_TOKEN_FAIL],
    promise: (api) => api.post('/auth/', { data }),
  };
}

export function destroyToken() {
  return {
    type: DESTROY_TOKEN,
  };
}
