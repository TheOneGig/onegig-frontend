import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import { Card, Text, Badge, Button, Group, Grid, Modal } from '@mantine/core';
import PropTypes from 'prop-types';
import { formatUSD } from 'utils/formatUSD';
import { archiveProject } from 'hooks/projects';
import DrawerRequirements from './drawerRequirements';

const statusRender = (status) => {
  switch (status) {
    case 'LEAD':
      return 'Lead';
    case 'CLIENTWAITING':
      return 'Client Waiting for Response';
    case 'REQUIREMENTS':
      return 'Waiting for Client Requirements';
    case 'ACTIVE':
      return 'In Progress';
    case 'INREVIEW':
      return 'Under Review';
    case 'REVISION':
      return 'Revision Requested';
    case 'COMPLETED':
      return 'Completed';
    default:
      return 'In Progress';
  }
};

const ProjectCard = ({ project, refetch, handleEdit }) => {
  const history = useNavigate();
  const [opened, setOpened] = useState(false);
  const [openedDelete, setOpenedDelete] = useState(false);
  const { mutate, isLoading: loadingDelete } = useMutation(['archiveProject'], (variables) => archiveProject(variables), {
    onSuccess: () => {
      refetch();
    }
  });

  function handleDelete(projectId) {
    const variables = { projectId, archived: true };
    return mutate({ variables });
  }

  return (
    <>
      <Grid.Col key={project.projectId} xs={12} lg={4} sm={6}>
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Group position="apart" mt="md" mb="xs">
            <Group>
              <Text weight={500}>Status:</Text>
              <Text weight={300}>{statusRender(project.status)}</Text>
            </Group>
            <Badge color="#1dbeea" variant="light">
              {formatUSD(project.price)}
            </Badge>
          </Group>
          <Group>
            <Text weight={500}>Service:</Text>
            <Text>{project.gig?.name}</Text>
          </Group>
          <Group>
            <Text weight={500}>Client:</Text>
            <Text weight={300}>{project.clientName}</Text>
          </Group>
          <Group>
            <Text weight={500}>Email:</Text>
            <Text weight={300}>{project.clientEmail}</Text>
          </Group>
          <Group>
            <Text weight={500}>Phone:</Text>
            <Text weight={300}>{project.clientPhone}</Text>
          </Group>
          <Text weight={500}>Description:</Text>
          <Text size="sm" color="dimmed">
            {project.description}
          </Text>
          <Grid>
            <Grid.Col span={4}>
              <Button className="green-btn" mt="md" radius="md" fullWidth onClick={() => history(`/tasks/${project.projectId}`)}>
                Tasks
              </Button>
            </Grid.Col>
            <Grid.Col span={4}>
              <Button className="green-btn" mt="md" radius="md" fullWidth onClick={() => history(`/resources/${project.projectId}`)}>
                Resources
              </Button>
            </Grid.Col>
            <Grid.Col span={4}>
              <Button
                className="green-btn"
                mt="md"
                radius="md"
                fullWidth
                component="a"
                target="_blank"
                rel="noopener noreferrer"
                href={`mailto:${project.clientEmail}`}
              >
                Email
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button className="green-btn" mt="md" radius="md" fullWidth onClick={() => setOpened(true)}>
                Requirements
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button className="blue-btn" mt="md" radius="md" fullWidth onClick={() => handleEdit(project)}>
                Edit
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button className="red-btn" mt="md" radius="md" fullWidth onClick={() => setOpenedDelete(true)}>
                Archive
              </Button>
            </Grid.Col>
          </Grid>
        </Card>
      </Grid.Col>

      <DrawerRequirements project={project} opened={opened} setOpened={setOpened} />

      <Modal opened={openedDelete} onClose={() => setOpenedDelete(false)} title="Delete project?" centered>
        <div>
          <p>
            Are you sure you want to archive this project? It will be moved to the archive and it will not be part of any of the other
            features such as financials and tasks.
          </p>
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
                className="red-btn"
                mt="md"
                radius="md"
                fullWidth
                onClick={() => handleDelete(project.projectId)}
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
  refetch: PropTypes.func,
  handleEdit: PropTypes.func
};

export default ProjectCard;
