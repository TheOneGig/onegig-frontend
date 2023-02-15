import { useQuery } from 'react-query';
import HoverSocialCard from 'components/cards/statistics/HoverSocialCard';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';
import { RiseOutlined, UnorderedListOutlined, YoutubeOutlined } from '@ant-design/icons';

import useAuth from 'hooks/useAuth';
import { getUser } from 'hooks/users';
import { formatUSD } from 'hooks/formatUSD';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const { data: userInfo, isLoading } = useQuery(['user'], () => getUser({ userId: user.id }));
  if (isLoading) {
    return <div>Loading dashboard...</div>;
  }
  const { ownedProjects } = userInfo;
  let openProfits = 0;
  let pendingTasks = [];
  ownedProjects.map((project) => {
    if (project.status === 'ACTIVE') {
      openProfits = openProfits + project.price;
    }
    project.taskTables?.map((taskTable) => {
      taskTable.tasks?.map((task) => {
        if (!task.done) {
          pendingTasks.push(task);
        }
      });
    });
  });
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} lg={4} sm={6}>
        <HoverSocialCard
          primary="Open Profits"
          secondary={`${formatUSD(openProfits)}`}
          iconPrimary={RiseOutlined}
          color={theme.palette.primary.main}
        />
      </Grid>
      <Grid item xs={12} lg={4} sm={6}>
        <HoverSocialCard
          primary="Pending Tasks"
          secondary={`${pendingTasks?.length}`}
          iconPrimary={UnorderedListOutlined}
          color={theme.palette.info.main}
        />
      </Grid>
      <Grid item xs={12} lg={4} sm={6}>
        <HoverSocialCard
          pushUrl={'/projects'}
          primary="Active Projects"
          secondary={`${ownedProjects?.length}`}
          iconPrimary={YoutubeOutlined}
          color={theme.palette.error.main}
        />
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
