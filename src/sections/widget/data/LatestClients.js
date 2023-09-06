import { Link as RouterLink } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import { useQuery } from 'react-query';
import { getClients } from 'hooks/clients';
import useWorkspace from 'hooks/useWorkspace';

// material-ui
import { Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import SimpleBar from 'components/third-party/SimpleBar';

// =========================|| DATA WIDGET - LATEST CUSTOMERS ||========================= //

const LatestCustomers = () => {
  const { user } = useAuth();
  const userId = user.id;
  const { workspaceId } = useWorkspace();
  const { data: clients, isLoading } = useQuery(['clients'], () => getClients({ userId }));
  if (isLoading) {
    return <div>Loading Clients...</div>;
  }

  if (!clients || !Array.isArray(clients)) {
    return <div>No clients available</div>;
  }

  return (
    <MainCard
      title="Latest Clients"
      content={false}
      secondary={
        <Link component={RouterLink} to={`/${workspaceId}/crm`} color="primary">
          View all
        </Link>
      }
    >
      <SimpleBar
        sx={{
          height: 290
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ pl: 3 }}>#</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>PhoneNumber</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="right" sx={{ pr: 3 }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client, index) => (
                <TableRow hover key={index}>
                  <TableCell sx={{ pl: 3 }}>{index + 1}</TableCell>
                  <TableCell>{client.lastName}</TableCell>
                  <TableCell>{client.firstName}</TableCell>
                  <TableCell>{client.phoneNumber}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell align="right" sx={{ pr: 3 }}>
                    {client.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </SimpleBar>
    </MainCard>
  );
};

export default LatestCustomers;
