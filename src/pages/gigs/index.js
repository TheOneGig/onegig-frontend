import { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
// material-ui
import { Flex, Card, Image, Text, Badge, Button, Group, Grid } from '@mantine/core';

import useAuth from 'hooks/useAuth';
import { getGigs, updatePublishGig } from 'hooks/gigs';
import GigCreate from './drawerCreate';

import OneGigLogo from 'assets/images/brand/OneGig-Logo-Gradient.png';
import { formatUSD } from 'hooks/formatUSD';

// ==============================|| GIGS ||============================== //

const Gigs = () => {
  const [opened, setOpened] = useState(false);
  const { user } = useAuth();
  const userId = user.id;
  const { mutate, isLoading: loadingPublish } = useMutation(['publishGig'], (variables) => updatePublishGig(variables), {
    onSuccess: () => {
      refetch();
    }
  });
  const { data: gigs, isLoading, refetch } = useQuery(['gigs'], () => getGigs({ userId }));
  if (isLoading) {
    return <div>Loading Gigs...</div>;
  }

  function handlePublish(gigId, published) {
    const variables = { gigId, published };
    return mutate({ variables });
  }

  return (
    <>
      <Flex mih={50} gap="md" justify="flex-start" align="flex-start" direction="row" wrap="wrap">
        <Button onClick={() => setOpened(true)} className="create-btn">
          Create Gig
        </Button>
      </Flex>
      <Grid>
        {gigs &&
          gigs.map((gig) => {
            return (
              <Grid.Col key={gig.gigId} xs={12} lg={4} sm={6}>
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
                  <Grid>
                    <Grid.Col span={6}>
                      <Button variant="light" color="blue" mt="md" radius="md" fullWidth>
                        Edit
                      </Button>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Button
                        variant="light"
                        color={gig.published ? 'red' : 'green'}
                        mt="md"
                        radius="md"
                        fullWidth
                        loading={loadingPublish}
                        onClick={() => handlePublish(gig.gigId, !gig.published)}
                      >
                        {gig.published ? 'Unpublish' : 'Publish'}
                      </Button>
                    </Grid.Col>
                  </Grid>
                </Card>
              </Grid.Col>
            );
          })}
      </Grid>

      <GigCreate opened={opened} setOpened={setOpened} refetch={refetch} userId={userId} />
    </>
  );
};

export default Gigs;
