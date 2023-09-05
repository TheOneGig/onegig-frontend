import { useNavigate } from 'react-router-dom';
import useClientAuth from 'hooks/useClientAuth';

const useClient = () => {
  const { client } = useClientAuth();
  console.log(client)
  const clientId = client?.id;
  console.log(clientId)
  const navigate = useNavigate();

  const goToDashboard = () => navigate(`/${clientId}/dashboard`);

  return { clientId, goToDashboard };
};

export default useClient;
