import { useMutation } from 'react-query';
import { Card, Image, Text, Badge, Button, Group, Grid } from '@mantine/core';
import { updatePublishGig } from 'hooks/gigs';
import PropTypes from 'prop-types';
import OneGigLogo from 'assets/images/brand/OneGig-Logo-Gradient.png';
import { formatUSD } from 'hooks/formatUSD';

const GigCard = ({ gig, refetch }) => {
  const { mutate, isLoading: loadingPublish } = useMutation(['publishGig'], (variables) => updatePublishGig(variables), {
    onSuccess: () => {
      refetch();
    }
  });
  function handlePublish(gigId, published) {
    const variables = { gigId, published };
    return mutate({ variables });
  }
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
};

GigCard.propTypes = {
  gig: PropTypes.object,
  refetch: PropTypes.func
};

export default GigCard;
