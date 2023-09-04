import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { CardContent, Grid, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { getMembers } from 'hooks/teams';
import { getWorkspace } from 'hooks/workspace';
import useAuth from 'hooks/useAuth';
import useWorkspace from 'hooks/useWorkspace';

// project imports
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';

// assets
import Avatar1 from 'assets/images/users/avatar-1.png';
import Avatar2 from 'assets/images/users/avatar-2.png';
import Avatar3 from 'assets/images/users/avatar-3.png';
import Avatar4 from 'assets/images/users/avatar-4.png';

// ===========================|| DATA WIDGET - TEAM MEMBERS CARD ||=========================== //

const TeamMembers = () => {
  const { user } = useAuth();
  const userId = user.id;
  const {workspaceId} = useWorkspace();
  const { data: members, isLoading, refetch } = useQuery(['members'], () => getWorkspace({ workspaceId }));
  console.log(members);
  
  if (isLoading) {
    return <div>Loading Members...</div>;
  }

  if (!members || !Array.isArray(members)) {
    return <div>No members available</div>;
  }

  return (
    <MainCard
      title="Team Members"
      content={false}
      // secondary={
      //   <Link component={RouterLink} to="#" color="primary">
      //     View all
      //   </Link>
      // }
    >
      <CardContent>
        <Grid container spacing={2.5} alignItems="center">
          {members.map((member, index) => (
            <Grid key={index} item xs={12}>
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <Avatar alt="User 1" src={Avatar1} />
                </Grid>
                <Grid item xs zeroMinWidth>
                  <Typography align="left" variant="subtitle1">
                    `${member.fname}${member.lname}`
                  </Typography>
                  <Typography align="left" variant="caption" color="secondary">
                    {member.role}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography align="left" variant="caption">
                    5 min ago
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </MainCard>
  );
};

export default TeamMembers;
