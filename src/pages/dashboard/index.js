import { useQuery } from 'react-query';
import HoverSocialCard from 'components/cards/statistics/HoverSocialCard';
// material-ui
import { Grid } from '@mui/material';
import {
  ContainerOutlined,
  RiseOutlined,
  UnorderedListOutlined,
  CreditCardOutlined,
  UsergroupAddOutlined,
  FileTextOutlined,
  BarChartOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import Chart from './AreaChart';
import dayjs from 'dayjs';
import useAuth from 'hooks/useAuth';
import useWorkspace from 'hooks/useWorkspace';
import { getWorkspace } from 'hooks/workspace';
import { formatUSD } from 'utils/formatUSD';
import { useTheme } from '@mui/material/styles';
import ToDoList from 'components/ToDoList';
import TeamMembers from 'sections/widget/data/TeamMembers';
import LatestCustomers from 'sections/widget/data/LatestClients';
import ReportCard from 'components/cards/statistics/ReportCard';
// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const { workspaceId } = useWorkspace();
  const { data: userInfo, isLoading } = useQuery(['getworkspace'], () => getWorkspace({ workspaceId }));
  console.log(userInfo)
  if (isLoading) {
    return <div>Loading dashboard...</div>;
  }

  const { ownedProjects = [], transactions = [], clients = [] } = userInfo;
  let openProfits = 0;
  let pendingTasks = [];

  console.log(userInfo);

  ownedProjects
    ?.filter((p) => p.status !== 'ARCHIVED')
    .map((project) => {
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

  const activeProjects = ownedProjects?.filter((p) => p.status !== 'ARCHIVED' && p.status !== 'LEAD');

  let expenses = new Array(12).fill(0);
  let revenue = new Array(12).fill(0);
  let totalRevenue = 0;
  let totalExpenses = 0;

  transactions?.forEach((transaction) => {
    let date = dayjs(transaction.date);
    let monthIndex = date.month();

    if (transaction.type === 'EXPENSE') {
      expenses[monthIndex] += transaction.amount / 100;
      totalExpenses += transaction.amount;
    } else if (transaction.type === 'REVENUE') {
      revenue[monthIndex] += transaction.amount / 100;
      totalRevenue += transaction.amount;
    }
  });

  const profit = parseFloat(totalRevenue - totalExpenses).toFixed(2);
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} lg={3} sm={6}>
        <HoverSocialCard
          pushUrl={'/finances'}
          primary="Profits"
          secondary={`${formatUSD(profit)}`}
          iconPrimary={RiseOutlined}
          color="#0eba9b"
        />
      </Grid>
      <Grid item xs={12} lg={3} sm={6}>
        <HoverSocialCard
          pushUrl={'/projects'}
          primary="Account Balance"
          secondary={`${formatUSD(profit)}`}
          iconPrimary={CreditCardOutlined}
          color="#303030"
        />
      </Grid>
      <Grid item xs={12} lg={3} sm={6}>
        <HoverSocialCard
          pushUrl={'/todo'}
          primary="Pending Tasks"
          secondary={`${pendingTasks?.length}`}
          iconPrimary={UnorderedListOutlined}
          color="#1dbeea"
        />
      </Grid>
      <Grid item xs={12} lg={3} sm={6}>
        <HoverSocialCard
          pushUrl={'/projects'}
          primary="Active Projects"
          secondary={`${activeProjects?.length}`}
          iconPrimary={ContainerOutlined}
          color="#303030"
        />
      </Grid>
      <Grid item xs={12} lg={8} sm={8} mb={2}>
        <Chart expenses={expenses} revenue={revenue} />
      </Grid>
      <Grid item xs={12} lg={4} sm={4}>
        <ToDoList userId={user.id} />
      </Grid>
      <Grid item xs={12} lg={3} sm={6}>
        <ReportCard
          primary={`${formatUSD(profit)}`}
          secondary="Expenses"
          color={theme.palette.secondary.main}
          iconPrimary={BarChartOutlined}
        />
      </Grid>
      <Grid item xs={12} lg={3} sm={6}>
        <ReportCard primary="145" secondary="Events" color={theme.palette.error.main} iconPrimary={CalendarOutlined} />
      </Grid>
      <Grid item xs={12} lg={3} sm={6}>
        <ReportCard primary="2+" secondary="Contracts" color={theme.palette.success.dark} iconPrimary={FileTextOutlined} />
      </Grid>
      <Grid item xs={12} lg={3} sm={6}>
        <ReportCard
          primary={`${clients.length}`}
          secondary="Clients"
          color={theme.palette.primary.main}
          iconPrimary={UsergroupAddOutlined}
        />
      </Grid>
      <Grid item xs={12} lg={4} sm={4}>
        <TeamMembers />
      </Grid>
      <Grid item xs={12} lg={8} sm={8} mb={2}>
        <LatestCustomers />
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
