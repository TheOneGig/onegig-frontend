import { useState } from 'react';
import { useQuery } from 'react-query';
// material-ui
import { Flex, Button, Grid } from '@mantine/core';

import useAuth from 'hooks/useAuth';
import ProjectCreate from './drawerCreate';

import ProjectCard from './projectCard';
import { getProjects } from 'hooks/projects';

// ==============================|| GIGS ||============================== //

const Projects = () => {
  const [opened, setOpened] = useState(false);
  const { user } = useAuth();
  const userId = user.id;
  const { data: projects, isLoading, refetch } = useQuery(['projects'], () => getProjects({ userId }));
  if (isLoading) {
    return <div>Loading Projects...</div>;
  }

  return (
    <>
      <Flex mih={50} gap="md" justify="flex-start" align="flex-start" direction="row" wrap="wrap">
        <Button onClick={() => setOpened(true)} className="create-btn">
          Create Project
        </Button>
      </Flex>
      <Grid>
        {projects.map((project) => {
          return <ProjectCard key={project.projectId} project={project} refetch={refetch} />;
        })}
      </Grid>

      <ProjectCreate opened={opened} setOpened={setOpened} refetch={refetch} userId={userId} />
    </>
  );
};

export default Projects;
