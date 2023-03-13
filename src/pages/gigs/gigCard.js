import { useState } from 'react';
import { useMutation } from 'react-query';
import { Card, Image, Text, Badge, Button, Group, Grid, Modal, CopyButton, Anchor, Tooltip } from '@mantine/core';
import PropTypes from 'prop-types';
import OneGigLogo from 'assets/images/brand/OneGig-Logo-Gradient.png';
import { formatUSD } from 'utils/formatUSD';
import { updatePublishGig, deleteGig } from 'hooks/gigs';
import { truncate } from 'utils/truncate';

const GigCard = ({ gig, refetch, handleEdit, share }) => {
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
        <Card className="card-design" shadow="sm" p="lg" radius="md" withBorder>
          <Card.Section>
            <Image src={gig.files?.length > 0 ? gig.files[0].fileUrl : OneGigLogo} alt="Gig" className="gig-card-image" />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>{gig.name}</Text>
            <Badge className="blue-btn" variant="light">
              {formatUSD(gig.price)}
            </Badge>
          </Group>

          <div style={{ height: '112px' }}>
            <Text size="sm" color="dimmed" align="justify">
              {truncate(gig.description, 250)}
            </Text>
          </div>
          <Grid>
            <Grid.Col span={6}>
              {share ? (
                <Anchor href={`/browse/gig/${gig.gigId}`} target="_blank" underline={false}>
                  <Button className="green-btn" mt="md" radius="md" fullWidth loading={loadingPublish}>
                    View
                  </Button>
                </Anchor>
              ) : (
                <Tooltip label="In order to view, the gig needs to be published" color="red" position="top-start" withArrow>
                  <Button className="green-btn" mt="md" radius="md" fullWidth>
                    View
                  </Button>
                </Tooltip>
              )}
            </Grid.Col>
            <Grid.Col span={6}>
              {share ? (
                <CopyButton value={`${window.location.origin}/browse/gig/${gig.gigId}`}>
                  {({ copied, copy }) => (
                    <Button className="blue-btn" variant="light" mt="md" radius="md" fullWidth onClick={copy}>
                      {copied ? 'Copied URL' : 'Share URL'}
                    </Button>
                  )}
                </CopyButton>
              ) : (
                <Tooltip label="In order to share, the gig needs to be published" color="red" position="top-end" withArrow>
                  <Button color={'gray'} variant="light" mt="md" radius="md" fullWidth>
                    Share URL
                  </Button>
                </Tooltip>
              )}
            </Grid.Col>
            <Grid.Col span={4}>
              <Button
                className="red-btn"
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
              <Button className="blue-btn" mt="md" radius="md" fullWidth onClick={() => handleEdit(gig)}>
                Edit
              </Button>
            </Grid.Col>
            <Grid.Col span={4}>
              <Button className="red-btn" mt="md" radius="md" fullWidth onClick={() => setOpenedDelete(true)}>
                Delete
              </Button>
            </Grid.Col>
          </Grid>
        </Card>
      </Grid.Col>

      <Modal opened={openedDelete} onClose={() => setOpenedDelete(false)} title="Delete gig?" centered>
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
              <Button className="red-btn" mt="md" radius="md" fullWidth onClick={() => handleDelete(gig.gigId)} loading={loadingDelete}>
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
  handleEdit: PropTypes.func,
  share: PropTypes.bool
};

export default GigCard;
