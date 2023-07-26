// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';

// project imports
import UserCountCard from 'components/cards/statistics/UserCountCard';
import LabelledTasks from 'sections/dashboard/analytics/LabelledTasks';
import ReaderCard from 'sections/dashboard/analytics/ReaderCard';

// assets
import { ContactsOutlined, FileProtectOutlined, RedditOutlined } from '@ant-design/icons';

// ===========================|| WIDGET - STATISTICS ||=========================== //

const WidgetStatistics = () => {
  const theme = useTheme();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={4}>
        <UserCountCard primary="Daily user" secondary="1,658" iconPrimary={ContactsOutlined} color={theme.palette.success.light} />
      </Grid>
      <Grid item xs={12} lg={4} sm={6}>
        <UserCountCard primary="Daily page view" secondary="1K" iconPrimary={FileProtectOutlined} color={theme.palette.primary.main} />
      </Grid>
      <Grid item xs={12} lg={4} sm={6}>
        <UserCountCard primary="Last month visitor" secondary="5,678" iconPrimary={RedditOutlined} color={theme.palette.warning.dark} />
      </Grid>
      <Grid item xs={12} md={8} lg={7}>
        <ReaderCard />
      </Grid>
      <Grid item xs={12} md={4} lg={5}>
        <LabelledTasks />
      </Grid>
    </Grid>
  );
};

export default WidgetStatistics;
