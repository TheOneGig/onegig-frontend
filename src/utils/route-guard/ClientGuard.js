import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useClientAuth';

const ClientGuard = ({ children }) => {
  const { isLoggedIn } = useAuth(); // Asumiendo que isClientLoggedIn es parte de tu estado de autenticación
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/client/login', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return children || null;
};

ClientGuard.propTypes = {
  children: PropTypes.node
};

export default ClientGuard;
