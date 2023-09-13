import { useQuery } from 'react-query';
// material-ui
import { Flex, Grid, Title } from '@mantine/core';

import ProjectCard from './projectCard';
import useClient from 'hooks/useClient';
import { getClientProjects } from 'hooks/projects';

// ==============================|| GIGS ||============================== //

const Projects = () => {
  const { clientId } = useClient();
  const { data: projects, isLoading, refetch } = useQuery(['projects'], () => getClientProjects({ clientId }));
  if (isLoading) {
    return <div>Loading Projects...</div>;
  }

  const filteredProjects = projects.map((project) => {
    if (project.payments?.length > 0) {
      if (project.status !== 'ARCHIVED' && project.status !== 'LEAD') {
        return project;
      } else {
        return null;
      }
    } else {
      return project;
    }
  });

  return (
    <>
      <Flex mih={50} gap="md" justify="flex-start" align="flex-start" direction="row" wrap="wrap">
        <Title sx={{ marginBottom: '15px' }}>Active Projects</Title>
      </Flex>
      <Grid>
        {filteredProjects
          .filter((n) => n)
          .map((project) => {
            return <ProjectCard key={project.projectId} project={project} refetch={refetch} />;
          })}
      </Grid>
    </>
  );
};

export default Projects;
