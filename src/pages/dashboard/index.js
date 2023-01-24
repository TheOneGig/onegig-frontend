import { useQuery } from 'react-query';
import HoverSocialCard from 'components/cards/statistics/HoverSocialCard';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';
import { FacebookOutlined, TwitterOutlined, YoutubeOutlined } from '@ant-design/icons';

import useAuth from 'hooks/useAuth';
import { getProjects } from 'hooks/projects';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const { data } = useQuery(['projects'], () => getProjects({ userId: user.id }));
  console.log('data: ', data);
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} lg={4} sm={6}>
        <HoverSocialCard primary="Facebook Users" secondary="1165 +" iconPrimary={FacebookOutlined} color={theme.palette.primary.main} />
      </Grid>
      <Grid item xs={12} lg={4} sm={6}>
        <HoverSocialCard primary="Twitter Users" secondary="780 +" iconPrimary={TwitterOutlined} color={theme.palette.info.main} />
      </Grid>
      <Grid item xs={12} lg={4} sm={6}>
        <HoverSocialCard primary="Youtube Videos" secondary="650 +" iconPrimary={YoutubeOutlined} color={theme.palette.error.main} />
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
