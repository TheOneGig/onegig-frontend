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
  const { data: gigs, isLoading } = useQuery(['gigs'], () => getGigs({ userId: user.id }));
  if (isLoading) {
    return <div>Loading Gigs...</div>;
  }
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {gigs &&
        gigs.map((gig) => {
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
