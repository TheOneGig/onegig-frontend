import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useClientPortalAuth from 'hooks/useClientPortalAuth';

const ClientPortalGuard = ({ children }) => {
  const { isClientPortalUserValid } = useClientPortalAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isClientPortalUserValid) {
      navigate('client', { replace: true });
    }
  }, [isClientPortalUserValid, navigate]);

  return children;
};

ClientPortalGuard.propTypes = {
  children: PropTypes.node
};

export default ClientPortalGuard;
