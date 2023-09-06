import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { LOGIN_CLIENT, LOGOUT_CLIENT } from 'store/reducers/actions';
import authReducer from 'store/reducers/auth';
import { loginClient } from 'hooks/clients';

// initial state, similar to your Redux state
const initialState = {
  isClientLoggedIn: false,
  isInitialized: false,
  client: null,
};

// Create Context
const ClientContext = createContext(null);


// Provider component
export const ClientProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);


  const EmailPasswordSignIn = async (email, accessKey) => {
    try {
      const clientdb = await loginClient({clientId: accessKey});
      console.log(clientdb);
      if (clientdb) {
        const newPayload = {
          isClientLoggedIn: true,
          client: {
            id: accessKey,
            email: email,
            firstName: clientdb.firstName,
            lastName: clientdb.lastName,
            role: 'CLIENT',
          }
        };
        dispatch({
          type: LOGIN_CLIENT,
          payload: newPayload,
        });
        console.log("Dispatched Payload:", newPayload);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };
  
  
  // Replace the following useEffect with your actual API calls for authentication
  useEffect(() => {
    // Mock API call to check client authentication
    const checkClientAuth = async () => {
      try {
        const client = await loginClient({clientId: accessKey}); // Replace this with your actual API call
        if (client) {
          dispatch({
            type: LOGIN_CLIENT,
            payload: {
              isClientLoggedIn: true,
              client,
            },
          });
        } else {
          dispatch({ type: LOGOUT_CLIENT });
        }
      } catch (error) {
        console.error('Failed to authenticate client:', error);
      }
    };

    checkClientAuth();
  }, [dispatch]);

  const logout = () => {
    dispatch({ type: LOGOUT_CLIENT });
  };


  const contextValue = {
    ...state,
    EmailPasswordSignIn,
    logout  // Add the function to the context
  };

  return (
    <ClientContext.Provider value={contextValue}>
      {children}
    </ClientContext.Provider>
  );
};

ClientProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ClientContext;
