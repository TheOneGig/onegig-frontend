import { useState } from 'react';
import { useQuery } from 'react-query';
// material-ui
import { Grid } from '@mui/material';
import { Flex, Card, Image, Text, Badge, Button, Group } from '@mantine/core';

import useAuth from 'hooks/useAuth';
import { getGigs } from 'hooks/gigs';
import GigCreate from './drawerCreate';

import OneGigLogo from 'assets/images/brand/OneGig-Logo-Gradient.png';
import { formatUSD } from 'hooks/formatUSD';

// ==============================|| GIGS ||============================== //

const Gigs = () => {
  const [opened, setOpened] = useState(false);
  const { user } = useAuth();
  const userId = user.id;
  const { data: gigs, isLoading, refetch } = useQuery(['gigs'], () => getGigs({ userId }));
  if (isLoading) {
    return <div>Loading Gigs...</div>;
  }
  return (
    <>
      <Flex mih={50} gap="md" justify="flex-start" align="flex-start" direction="row" wrap="wrap">
        <Button onClick={() => setOpened(true)} className="create-btn">
          Create Gig
        </Button>
      </Flex>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        {gigs &&
          gigs.map((gig) => {
            return (
              <Grid key={gig.id} item xs={12} lg={4} sm={6}>
                <Card shadow="sm" p="lg" radius="md" withBorder>
                  <Card.Section>
                    <Image src={OneGigLogo} alt="Gig" className="gig-card-image" />
                  </Card.Section>

                  <Group position="apart" mt="md" mb="xs">
                    <Text weight={500}>{gig.name}</Text>
                    <Badge color="pink" variant="light">
                      {formatUSD(gig.price)}
                    </Badge>
                  </Group>

                  <Text size="sm" color="dimmed">
                    {gig.description}
                  </Text>

                  <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                    Edit
                  </Button>
                </Card>
              </Grid>
            );
          })}
      </Grid>

      <GigCreate opened={opened} setOpened={setOpened} refetch={refetch} userId={userId} />
    </>
  );
};

export default Gigs;
