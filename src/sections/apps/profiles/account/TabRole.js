import { useState } from 'react';
import { useQuery, useMutation } from 'react-query';

// material-ui
import {
  Button,
  Chip,
  Divider,
  Grid,
  InputLabel,
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  MenuItem,
  DialogTitle,
  Select,
} from '@mui/material';
import IconButton from 'components/@extended/IconButton';
import { showNotification } from '@mantine/notifications';
import { createNotification } from 'hooks/notifications';
import useAuth from 'hooks/useAuth';
import useWorkspace from 'hooks/useWorkspace';
import { useTheme } from '@mui/material/styles';
// project import
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import { sendWorkspaceInvite } from 'utils/sendEmail';
// assets
import { EllipsisOutlined } from '@ant-design/icons';
import { updateUser } from 'hooks/users';
import { createTeam } from 'hooks/teams';
import { getMembers } from 'hooks/users';

import { IconCheck } from '@tabler/icons-react';

// table data
function createData(name, lastName, avatar, email, role, status) {
  return { name, lastName, avatar, email, role, status };
}

const avatarImage = require.context('assets/images/users', true);


// ==============================|| ACCOUNT PROFILE - ROLE ||============================== //

const TabRole = () => {
  const [email, setEmail] = useState('');
  const theme = useTheme();
  const {user } = useAuth()
  const userId = user.id
  const { workspaceId } = useWorkspace()
  const [openModal, setOpenModal] = useState(false);
  const [editOpened, setEditOpened] = useState(false);
  const [deleteSelected, setDeleteSelected] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [memberId, setMemberId] = useState(null);
  const createNotificationMutation = useMutation(createNotification);
  const { data: members, isLoading, refetch } = useQuery(['members'], () => getMembers({ workspaceId }));
  console.log(members);
  console.log(team)
  console.log("user",user,"workspace id ",workspaceId )
  const { mutate: updateRole } = useMutation(['updateUser'], (variables) => updateUser(variables), {
    onSuccess: () => {
      refetch();
      setEditOpened(false);
      showNotification({
        id: 'load-data',
        color: 'blue',
        title: 'User Role Modified!',
        message: 'Your team member role was updated succesfully, you can close this notification',
        icon: <IconCheck size="1rem" />,
        autoClose: 3000
      });
      createNotificationMutation.mutate({
        variables: {
          userId: userId,
          message: 'User Role Modified!'
        }
      });
      setSelectedRole(null);
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;  // Replace this with a proper loading component
  }


  const rows = members.map(member => createData(
    member.fName,
    member.lName,
    member.avatar,
    member.email,
    member.role,
    'true'
  ));

  
  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleEditClick = () => {
    setEditOpened(true);
  };

  const handleEdit = () => {
    const variables = {
      memberId: memberId,
      role: selectedRole
    };

    return updateRole(variables);
  };

  const handleSendEmail = () => {
   const variables = {
      to_email: email,
      workspaceId: workspaceId
    };
    sendWorkspaceInvite(variables);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard title="Invite Team Members" content={false}>
          <Stack spacing={2.5} sx={{ p: 2.5 }}>
            <Typography variant="h4">
              5/10{' '}
              <Typography variant="subtitle1" component="span">
                members available in your plan.
              </Typography>
            </Typography>
            <Divider />
            <Stack
              spacing={3}
              direction="row"
              justifyContent="space-between"
              alignItems="flex-end"
              sx={{ width: { xs: 1, md: '80%', lg: '60%' } }}
            >
              <Stack spacing={1} sx={{ width: `calc(100% - 110px)` }}>
                <InputLabel htmlFor="outlined-email">Email Address</InputLabel>
                <TextField
                  fullWidth
                  id="outlined-email"
                  variant="outlined"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Stack>
              <Button variant="contained" size="large" onClick={handleSendEmail}>
                Send
              </Button>
            </Stack>
            </Stack>
          <TableContainer>
            <Table sx={{ minWidth: 350 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ pl: 3 }}>Member</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right" />
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow hover key={row.name + ' ' + row.lName}>
                    <TableCell sx={{ pl: 3 }} component="th">
                      <Stack direction="row" alignItems="center" spacing={1.25}>
                        <Avatar alt="Avatar 1" src={avatarImage(`./${row.avatar}`)} />
                        <Stack spacing={0}>
                          <Typography variant="subtitle1">{row.name}</Typography>
                          <Typography variant="caption" color="secondary">
                            {row.email}
                          </Typography>
                        </Stack>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {row.role === 'ADMIN' && <Chip size="small" color="success" label="Admin" />}
                      {row.role === 'LEADER' && <Chip size="small" color="info" label="Team leader" />}
                      {row.role === 'USER' && <Chip size="small" color="info" label="Collaborator" />}
                    </TableCell>
                    <TableCell align="right">
                      {!row.status && (
                        <Stack direction="row" alignItems="center" spacing={1.25} justifyContent="flex-end">
                          <Button size="small" color="error">
                            Resend
                          </Button>
                          <Chip size="small" color="info" variant="outlined" label="Invited" />
                        </Stack>
                      )}
                      {row.status && <Chip size="small" color="success" label="Joined" />}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => setOpenModal(true)} style={{ fontSize: '1.15rem' }} size="small" color="secondary">
                        <EllipsisOutlined />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </MainCard>
      </Grid>
      {/* <Grid item xs={12}>
      <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
        <Button color="error">Cancel</Button>
        <Button variant="contained">Update Profile</Button>
      </Stack>
    </Grid> */}
        <Dialog
          open={openModal}
          onClose={handleModalClose}
          fullWidth
          sx={{ backgroundColor: theme.palette.background.default}}
          maxWidth="xs"
        >
          <DialogTitle>{deleteSelected ? 'Kickout User?' : 'Actions'}</DialogTitle>
          <DialogContent>
        {deleteSelected ? (
          <>
            <Button
              fullWidth
              mt={20}
              variant="contained" 
              size="large"
              color="red"
              onClick={() => {
                handleModalClose();
              }}
            >
              Yes
            </Button>
            <Button
              fullWidth
              mt={20}
              variant="contained"
              size="large"
              onClick={() => {
                setDeleteSelected(false);
              }}
            >
              No
            </Button>
          </>
        ) : (
          <>
            <Button
              fullWidth
              mt={20}
              color='primary'
              size='large'
              onClick={() => {
                handleEditClick();
                handleModalClose();
              }}
            >
              User Role
            </Button>
            <Button
              fullWidth
              mt={20}
              color="primary"
              size="large"
              onClick={() => {
                setDeleteSelected(true);
              }}
            >
              Delete
            </Button>
          </>
        )}
        </DialogContent>
      <DialogActions>
        <Button onClick={handleModalClose} variant="contained" size="large" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
      <Dialog
        open={editOpened}
        onClose={() => setEditOpened(false)}
        fullWidth
        sx={{ backgroundColor: theme.palette.background.default}}
        maxWidth="xs"
      >
      <DialogTitle>Edit note</DialogTitle>
      <DialogContent>
          <Box>
            <Stack direction="column" alignItems="center" spacing={1.25} >
            <Select
              label="Change User Role"
              placeholder="Select Role"
              size='large'
              fullWidth
              value={selectedRole}
              onChange={(event) => setSelectedRole(event.target.value)}
            >
              <MenuItem value="LEADER">Team leader</MenuItem>
              <MenuItem value="USER">Collaborator</MenuItem>
            </Select>
            </Stack>
          </Box>
        </DialogContent>
      <DialogActions>
        <Button onClick={() => setEditOpened(false)} variant="contained"  color="primary">
          Cancel
        </Button>
        <Button onClick={handleEdit} variant="contained"  color="primary">
          Change Role
        </Button>
      </DialogActions>
    </Dialog>
    </Grid>
  );
};

export default TabRole;
