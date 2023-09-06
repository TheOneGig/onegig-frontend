import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// project import
import useAuth from 'hooks/useAuth';

// ==============================|| AUTH GUARD ||============================== //

const AuthGuard = ({ children, requiredRoles }) => {
  const { isLoggedIn, user } = useAuth();
  const { workspaceId } = user || {};
  const role = user.role
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/auth/login', { replace: true });
    } else if (requiredRoles && !requiredRoles.includes(role)) { // Verificar si el rol del usuario está en los roles requeridos
      navigate('/maintenance/500', { replace: true });
    }
    //  else if (!workspaceId) {
    //   navigate('/create-workspace', { replace: true });
    // }
  }, [isLoggedIn, navigate, requiredRoles, role, workspaceId]);

  return children || null;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
  requiredRoles: PropTypes.arrayOf(PropTypes.string)
};

AuthGuard.defaultProps = {
  requiredRoles: []
};

export default AuthGuard;
