import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import { Card, Image, Text, Badge, Button, Group, Grid, Modal } from '@mantine/core';
import PropTypes from 'prop-types';
import OneGigLogo from 'assets/images/brand/OneGig-Logo-Gradient.png';
import { formatUSD } from 'hooks/formatUSD';
import { deleteGig } from 'hooks/gigs';

const ProjectCard = ({ project, refetch }) => {
  const history = useNavigate();
  const [openedDelete, setOpenedDelete] = useState(false);
  const { mutate: gigDelete, isLoading: loadingDelete } = useMutation(['publishGig'], (variables) => deleteGig(variables), {
    onSuccess: () => {
      refetch();
    }
  });

  function handleDelete(gigId) {
    const variables = { gigId };
    return gigDelete({ variables });
  }
  return (
    <>
      <Grid.Col key={project.projectId} xs={12} lg={4} sm={6}>
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Card.Section>
            <Image src={OneGigLogo} alt="Gig" className="gig-card-image" />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>{project.name}</Text>
            <Badge color="pink" variant="light">
              {formatUSD(project.price)}
            </Badge>
          </Group>

          <Text size="sm" color="dimmed">
            {project.description}
          </Text>
          <Grid>
            <Grid.Col span={4}>
              <Button variant="light" color="green" mt="md" radius="md" fullWidth onClick={() => history(`/tasks/${project.projectId}`)}>
                Tasks
              </Button>
            </Grid.Col>
            <Grid.Col span={4}>
              <Button variant="light" color="blue" mt="md" radius="md" fullWidth>
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
          <p>Are you sure you want to delete this gig? This is unreversible!</p>
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

ProjectCard.propTypes = {
  project: PropTypes.object,
  refetch: PropTypes.func
};

export default ProjectCard;
