import { useQuery } from 'react-query';
import HoverSocialCard from 'components/cards/statistics/HoverSocialCard';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';
import { RiseOutlined, UnorderedListOutlined, YoutubeOutlined } from '@ant-design/icons';

import useAuth from 'hooks/useAuth';
import { getProjects } from 'hooks/projects';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const { data } = useQuery(['projects'], () => getProjects({ userId: user.id }));
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} lg={4} sm={6}>
        <HoverSocialCard primary="Monthly Profits" secondary="$3165" iconPrimary={RiseOutlined} color={theme.palette.primary.main} />
      </Grid>
      <Grid item xs={12} lg={4} sm={6}>
        <HoverSocialCard primary="Pending Tasks" secondary="780 +" iconPrimary={UnorderedListOutlined} color={theme.palette.info.main} />
      </Grid>
      <Grid item xs={12} lg={4} sm={6}>
        <HoverSocialCard
          pushUrl={'/projects'}
          primary="Active Projects"
          secondary={`${data?.length}`}
          iconPrimary={YoutubeOutlined}
          color={theme.palette.error.main}
        />
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
