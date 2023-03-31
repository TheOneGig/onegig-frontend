import PropTypes from 'prop-types';
import MainCard from 'components/MainCard';
import GigCard from './gigCard';
import { Grid } from '@mantine/core';
import { Typography } from '@mui/material';

const RelatedGigs = ({ user }) => {
  const { gigs, fname, lname } = user;

  return (
    <MainCard>
      <Typography variant="h3" sx={{ marginBottom: '20px' }}>
        Other Gigs by {fname} {lname}
      </Typography>
      <Grid>
        {gigs.map((gig) => (
          <Grid.Col span={3} key={gig.gigId}>
            <GigCard gig={gig} />
          </Grid.Col>
        ))}
      </Grid>
    </MainCard>
  );
};

RelatedGigs.propTypes = {
  user: PropTypes.object
};

export default RelatedGigs;
