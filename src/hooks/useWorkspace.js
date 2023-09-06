import { useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';

const useWorkspace = () => {
  const { user } = useAuth();
  const workspaceId = user.workspaceId ? user.workspaceId.workspaceId : null;
  const navigate = useNavigate();

  const goToDashboard = () => navigate(`/${workspaceId}/dashboard`);

  return { workspaceId, goToDashboard };
};

export default useWorkspace;
