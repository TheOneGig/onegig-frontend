import { useState } from 'react';
import { useQuery } from 'react-query';
// material-ui
import { Flex, Button, Grid, Title } from '@mantine/core';

import useAuth from 'hooks/useAuth';
import { getGigs } from 'hooks/gigs';
import GigCreate from './drawerCreate';

import GigCard from './gigCard';

// ==============================|| GIGS ||============================== //

const Gigs = () => {
  const [opened, setOpened] = useState(false);
  const { user } = useAuth();
  const userId = user.id;
  const { data: gigs, isLoading, refetch } = useQuery(['gigs'], () => getGigs({ userId }));
  if (isLoading) {
    return <div>Loading Gigs...</div>;
  }

  const publishedGigs = gigs.filter((gig) => gig.published);
  const unpublishedGigs = gigs.filter((gig) => !gig.published);

  return (
    <>
      <Flex mih={50} gap="md" justify="flex-start" align="flex-start" direction="row" wrap="wrap">
        <Button onClick={() => setOpened(true)} className="create-btn">
          Create Gig
        </Button>
      </Flex>
      <Title>Published Gigs</Title>
      <Grid>
        {publishedGigs.map((gig) => {
          return <GigCard key={gig.gigId} gig={gig} refetch={refetch} />;
        })}
      </Grid>

      <Title>Unpublished Gigs</Title>
      <Grid>
        {unpublishedGigs.map((gig) => {
          return <GigCard key={gig.gigId} gig={gig} refetch={refetch} />;
        })}
      </Grid>

      <GigCreate opened={opened} setOpened={setOpened} refetch={refetch} userId={userId} />
    </>
  );
};

export default Gigs;
