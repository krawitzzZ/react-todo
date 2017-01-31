const RECEIVE_TOKEN = 'rr/RECEIVE_TOKEN';
const DESTROY_TOKEN = 'rr/DESTROY_TOKEN';

const initUser = {
  username: '',
  email: '',
  authenticated: false
};

export default function user(state = initUser, action) {
  switch (action.type) {
    case RECEIVE_TOKEN:
      return {
        ...state,
        ...action.data.user,
        authenticated: true,
      };

    case DESTROY_TOKEN:
      return {
        ...state,
        ...initUser,
      };

    default:
      return state;
  }
}

export function receiveToken() {
  return {
    type: RECEIVE_TOKEN,
    data: {
      user: {
        username: 'anonymous',
        email: 'anon@example.com',
      },
    },
  };
}

export function destroyToken() {
  return {
    type: DESTROY_TOKEN,
  };
}
