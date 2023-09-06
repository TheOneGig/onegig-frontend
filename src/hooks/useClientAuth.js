import { useContext } from 'react';

// auth provider
import ClientContext from 'contexts/FirebaseClientContext';
// import AuthContext from 'contexts/AWSCognitoContext';
// import AuthContext from 'contexts/JWTContext';
// import AuthContext from 'contexts/Auth0Context';

// ==============================|| AUTH HOOKS ||============================== //

const useClientAuth = () => {
  const context = useContext(ClientContext);

  if (!context) throw new Error('context must be use inside provider');

  return context;
};

export default useClientAuth;
