import { useQuery } from 'react-query';
import HoverSocialCard from 'components/cards/statistics/HoverSocialCard';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';
import { RiseOutlined, UnorderedListOutlined, YoutubeOutlined } from '@ant-design/icons';

import useAuth from 'hooks/useAuth';
import { getGigs } from 'hooks/gigs';

// ==============================|| GIGS ||============================== //

const Gigs = () => {
  const theme = useTheme();
  const { user } = useAuth();
  console.log('user', user);
  const { data } = useQuery(['gigs'], () => getGigs({ userId: user.id }));
  console.log('data: ', data);
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
        <HoverSocialCard primary="Active Projects" secondary="650 +" iconPrimary={YoutubeOutlined} color={theme.palette.error.main} />
      </Grid>
    </Grid>
  );
};

export default Gigs;
