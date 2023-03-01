import { useQuery } from 'react-query';
import HoverSocialCard from 'components/cards/statistics/HoverSocialCard';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';
import { ContainerOutlined, RiseOutlined, UnorderedListOutlined } from '@ant-design/icons';
import AreaChart from './AreaChart';

import useAuth from 'hooks/useAuth';
import { getUser } from 'hooks/users';
import { formatUSD } from 'utils/formatUSD';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const { data: userInfo, isLoading } = useQuery(['user'], () => getUser({ userId: user.id }));
  if (isLoading) {
    return <div>Loading dashboard...</div>;
  }

  const { ownedProjects, transactions } = userInfo;
  let openProfits = 0;
  let pendingTasks = [];

  ownedProjects?.map((project) => {
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

  const activeProjects = ownedProjects?.filter((p) => p.status !== 'ARCHIVED');

  let dates = [];
  let revenues = [];
  let totalRevenue = 0;
  let expenses = [];
  let totalExpenses = 0;
  transactions.map((transaction) => {
    dates.push(transaction.createdAt);
    if (transaction.type === 'REVENUE') {
      revenues.push(transaction.amount / 100);
      totalRevenue = totalRevenue + transaction.amount;
    } else {
      expenses.push(transaction.amount / 100);
      totalExpenses = totalExpenses + transaction.amount;
    }
  });
  const profit = parseFloat(totalRevenue / 100 - totalExpenses / 100).toFixed(2);
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} lg={4} sm={6}>
        <HoverSocialCard
          primary="Profits"
          secondary={`${formatUSD(profit)}`}
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
          secondary={`${activeProjects?.length}`}
          iconPrimary={ContainerOutlined}
          color="#c8c8c8"
        />
      </Grid>
      <Grid item xs={12} lg={12} sm={12}>
        <AreaChart dates={dates} expenses={expenses} revenues={revenues} />
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
