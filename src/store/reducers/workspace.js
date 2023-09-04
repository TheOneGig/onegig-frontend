import { REGISTER_USER, LOGIN_USER, LOGOUT_USER, REGISTER_CLIENT, LOGIN_CLIENT, LOGOUT_CLIENT, SET_WORKSPACE_ID } from './actions';

// initial state
export const initialState = {
  isLoggedIn: false,
  isClientLoggedIn: false,
  isInitialized: false,
  user: null,
  client: null,
  workspaceId: null,
};

// ==============================|| AUTH REDUCER ||============================== //

const auth = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER: {
      const { user } = action.payload;
      return {
        ...state,
        user
      };
    }
    case LOGIN_USER: {
      const { user } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        isInitialized: true,
        user
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        isInitialized: true,
        isLoggedIn: false,
        user: null
      };
    }
    case REGISTER_CLIENT: {
      const { client } = action.payload;
      return {
        ...state,
        client
      };
    }
    case LOGIN_CLIENT: {
      const { client } = action.payload;
      return {
        ...state,
        isClientLoggedIn: true,
        isInitialized: true,
        client
      };
    }
    case LOGOUT_CLIENT: {
      return {
        ...state,
        isInitialized: true,
        isClientLoggedIn: false,
        client: null
      };
    }
    case SET_WORKSPACE_ID: { 
      const { workspaceId } = action.payload;
      return {
        ...state,
        workspaceId
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default auth;
