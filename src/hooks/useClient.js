import { useNavigate } from 'react-router-dom';
import useClientAuth from 'hooks/useClientAuth';

const useClient = () => {
  const { client } = useClientAuth();
  const clientId = client.id
  const navigate = useNavigate();

  const goToDashboard = () => navigate(`/${clientId}/dashboard`);

  return { clientId, goToDashboard };
};

export default useClient;
