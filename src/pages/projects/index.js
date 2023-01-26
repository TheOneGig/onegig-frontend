import { useState } from 'react';
import { useQuery } from 'react-query';
// material-ui
import { Flex, Button, Grid, Title } from '@mantine/core';

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

  const leadProjects = projects.filter((project) => project.status === 'LEAD');
  const activeProjects = projects.filter((project) => project.status === 'ACTIVE');
  const completedProjects = projects.filter((project) => project.status === 'COMPLETED');

  return (
    <>
      <Flex mih={50} gap="md" justify="flex-start" align="flex-start" direction="row" wrap="wrap">
        <Button onClick={() => setOpened(true)} className="create-btn">
          Create Project
        </Button>
      </Flex>

      <Title>Leads</Title>
      <Grid>
        {leadProjects.map((project) => {
          return <ProjectCard key={project.projectId} project={project} refetch={refetch} />;
        })}
      </Grid>

      <Title>Active Projects</Title>
      <Grid>
        {activeProjects.map((project) => {
          return <ProjectCard key={project.projectId} project={project} refetch={refetch} />;
        })}
      </Grid>

      <Title>Completed Projects</Title>
      <Grid>
        {completedProjects.map((project) => {
          return <ProjectCard key={project.project} project={project} refetch={refetch} />;
        })}
      </Grid>

      <ProjectCreate opened={opened} setOpened={setOpened} refetch={refetch} userId={userId} />
    </>
  );
};

export default Projects;
