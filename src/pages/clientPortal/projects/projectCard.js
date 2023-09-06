//import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, Text, Badge, Button, Group, Grid } from '@mantine/core';
import PropTypes from 'prop-types';
import { formatUSD } from 'utils/formatUSD';

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

const ProjectCard = ({ project }) => {
  const history = useNavigate();

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
            <Grid.Col span={4} xs={12} md={8} lg={4}>
              <Button
                className="green-btn"
                mt={{ xs: 'md', md: 0 }}
                radius="md"
                fullWidth
                onClick={() => history(`/resources/${project.projectId}`)}
              >
                Resources
              </Button>
            </Grid.Col>
          </Grid>
        </Card>
      </Grid.Col>
    </>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.object,
  refetch: PropTypes.func,
  handleEdit: PropTypes.func
};

export default ProjectCard;
