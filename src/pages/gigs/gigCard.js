import { useState } from 'react';
import { useMutation } from 'react-query';
import { Card, Image, Text, Badge, Button, Group, Grid, Modal, CopyButton } from '@mantine/core';
import PropTypes from 'prop-types';
import OneGigLogo from 'assets/images/brand/OneGig-Logo-Gradient.png';
import { formatUSD } from 'hooks/formatUSD';
import { updatePublishGig, deleteGig } from 'hooks/gigs';
import { useNavigate } from 'react-router';

const GigCard = ({ gig, refetch, handleEdit }) => {
  const history = useNavigate();
  const [openedDelete, setOpenedDelete] = useState(false);
  const { mutate: gigDelete, isLoading: loadingDelete } = useMutation(['deleteGig'], (variables) => deleteGig(variables), {
    onSuccess: () => {
      refetch();
    }
  });
  const { mutate, isLoading: loadingPublish } = useMutation(['publishGig'], (variables) => updatePublishGig(variables), {
    onSuccess: () => {
      refetch();
    }
  });

  function handleDelete(gigId) {
    const variables = { gigId };
    return gigDelete({ variables });
  }

  function handlePublish(gigId, published) {
    const variables = { gigId, published };
    return mutate({ variables });
  }
  return (
    <>
      <Grid.Col key={gig.gigId} xs={12} lg={4} sm={6}>
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Card.Section>
            <Image src={gig.files?.length > 0 ? gig.files[0].fileUrl : OneGigLogo} alt="Gig" className="gig-card-image" />
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
              <Button
                variant="light"
                color={'green'}
                mt="md"
                radius="md"
                fullWidth
                loading={loadingPublish}
                onClick={() => history(`/browse/gig/${gig.gigId}`)}
              >
                View
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <CopyButton value={`${window.location.origin}/browse/gig/${gig.gigId}`}>
                {({ copied, copy }) => (
                  <Button color={copied ? 'teal' : 'blue'} variant="light" mt="md" radius="md" fullWidth onClick={copy}>
                    {copied ? 'Copied URL' : 'Share URL'}
                  </Button>
                )}
              </CopyButton>
            </Grid.Col>
            <Grid.Col span={4}>
              <Button
                variant="light"
                color={gig.published ? 'yellow' : 'green'}
                mt="md"
                radius="md"
                fullWidth
                loading={loadingPublish}
                onClick={() => handlePublish(gig.gigId, !gig.published)}
              >
                {gig.published ? 'Unpublish' : 'Publish'}
              </Button>
            </Grid.Col>
            <Grid.Col span={4}>
              <Button variant="light" color="blue" mt="md" radius="md" fullWidth onClick={() => handleEdit(gig)}>
                Edit
              </Button>
            </Grid.Col>
            <Grid.Col span={4}>
              <Button variant="light" color="red" mt="md" radius="md" fullWidth onClick={() => setOpenedDelete(true)}>
                Delete
              </Button>
            </Grid.Col>
          </Grid>
        </Card>
      </Grid.Col>

      <Modal opened={openedDelete} onClose={() => setOpenedDelete(false)} title="Delete gig?">
        <div>
          <p>Are you sure you want to delete this gig? This is irreversible!</p>
          <Grid>
            <Grid.Col span={6}>
              <Button
                variant="light"
                color="default"
                mt="md"
                radius="md"
                fullWidth
                onClick={() => setOpenedDelete(false)}
                loading={loadingDelete}
              >
                Cancel
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button
                variant="light"
                color="red"
                mt="md"
                radius="md"
                fullWidth
                onClick={() => handleDelete(gig.gigId)}
                loading={loadingDelete}
              >
                Yes, I am sure!
              </Button>
            </Grid.Col>
          </Grid>
        </div>
      </Modal>
    </>
  );
};

GigCard.propTypes = {
  gig: PropTypes.object,
  refetch: PropTypes.func,
  handleEdit: PropTypes.func
};

export default GigCard;
