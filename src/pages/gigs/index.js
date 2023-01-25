import { useQuery } from 'react-query';
import HoverSocialCard from 'components/cards/statistics/HoverSocialCard';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';
import { RiseOutlined } from '@ant-design/icons';

import useAuth from 'hooks/useAuth';
import { getGigs } from 'hooks/gigs';

// ==============================|| GIGS ||============================== //

const Gigs = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const { data } = useQuery(['gigs'], () => getGigs({ userId: user.id }));
  console.log('data: ', data);
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {data.map((gig) => {
        return (
          <Grid item xs={12} lg={4} sm={6} key={gig.id}>
            <HoverSocialCard primary={gig.price} secondary={gig.name} iconPrimary={RiseOutlined} color={theme.palette.primary.main} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Gigs;
