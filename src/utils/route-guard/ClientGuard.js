import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useClientAuth from 'hooks/useClientAuth';

const ClientGuard = ({ children }) => {
  const { isClientLoggedIn } = useClientAuth(); // Asumiendo que isClientLoggedIn es parte de tu estado de autenticación
  const navigate = useNavigate();

  useEffect(() => {
    if (!isClientLoggedIn) {
      navigate('/client/login', { replace: true });
    }
  }, [isClientLoggedIn, navigate]);

  return children || null;
};

ClientGuard.propTypes = {
  children: PropTypes.node
};

export default ClientGuard;
