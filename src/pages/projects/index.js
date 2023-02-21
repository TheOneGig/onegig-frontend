import { useState } from 'react';
import { useQuery } from 'react-query';
// material-ui
import { Flex, Button, Grid } from '@mantine/core';

import useAuth from 'hooks/useAuth';
import ProjectCreate from './drawerCreate';

import ProjectCard from './projectCard';
import ProjectEdit from './drawerEdit';
import { getProjects } from 'hooks/projects';
import { getGigs } from 'hooks/gigs';

// ==============================|| GIGS ||============================== //

const Projects = () => {
  const [opened, setOpened] = useState(false);
  const [openedEdit, setOpenedEdit] = useState(false);
  const [selectedProject, setSelectedProject] = useState();
  const { user } = useAuth();
  const userId = user.id;
  const { data: projects, isLoading, refetch } = useQuery(['projects'], () => getProjects({ userId }));
  const { data: gigs, isLoading: loadingGigs } = useQuery(['gigs'], () => getGigs({ userId }));
  if (isLoading || loadingGigs) {
    return <div>Loading Projects...</div>;
  }

  function handleEdit(project) {
    setSelectedProject(project);
    setOpenedEdit(true);
  }

  return (
    <>
      <Flex mih={50} gap="md" justify="flex-start" align="flex-start" direction="row" wrap="wrap">
        <Button onClick={() => setOpened(true)} className="create-btn" variant="light">
          New Project
        </Button>
      </Flex>
      <Grid>
        {projects.map((project) => {
          return <ProjectCard key={project.projectId} project={project} refetch={refetch} handleEdit={handleEdit} />;
        })}
      </Grid>

      <ProjectCreate opened={opened} setOpened={setOpened} refetch={refetch} userId={userId} gigs={gigs} />
      {selectedProject && <ProjectEdit opened={openedEdit} setOpened={setOpenedEdit} refetch={refetch} project={selectedProject} />}
    </>
  );
};

export default Projects;
