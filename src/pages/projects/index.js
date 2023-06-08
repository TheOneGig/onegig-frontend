import { useState } from 'react';
import { useQuery } from 'react-query';
// material-ui
import { Flex, Button, Grid, Title, Tooltip } from '@mantine/core';

import useAuth from 'hooks/useAuth';
import ProjectCreate from './drawerCreate';

import ProjectCard from './projectCard';
import ProjectEdit from './drawerEdit';
import { getProjects } from 'hooks/projects';
import { getGigs } from 'hooks/gigs';
import LeadCard from './leadCard';

// ==============================|| GIGS ||============================== //

const Projects = () => {
  const [opened, setOpened] = useState(false);
  const [openedEdit, setOpenedEdit] = useState(false);
  const [selectedProject, setSelectedProject] = useState();
  const { user } = useAuth();
  const userId = user.id;
  const { data: projects, isLoading, refetch } = useQuery(['projects'], () => getProjects({ userId }));
  const { data: gigs, isLoading: loadingGigs, refetch: refetchGigs } = useQuery(['gigs'], () => getGigs({ userId }));
  if (isLoading || loadingGigs) {
    return <div>Loading Projects...</div>;
  }

  function handleEdit(project) {
    setSelectedProject(project);
    setOpenedEdit(true);
  }

  let leads = [];
  gigs.map((gig) => gig.leads.map((lead) => leads.push(lead)));

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
        <Tooltip
          label="Create a new project "
          position="right"
          transition="fade"
          style={{
            backgroundColor: '#3333',
            borderRadius: 6,
            padding: '12px 16px',
            color: '#fff',
            fontSize: 12,
            transition: 0.3
          }}
        >
          <Button onClick={() => setOpened(true)} className="create-btn blue-btn" variant="light">
            New Project
          </Button>
        </Tooltip>
      </Flex>
      <Title sx={{ marginBottom: '15px' }}>Active Projects</Title>
      <Grid>
        {filteredProjects
          .filter((n) => n)
          .map((project) => {
            return <ProjectCard key={project.projectId} project={project} refetch={refetch} handleEdit={handleEdit} />;
          })}
      </Grid>
      <Title sx={{ marginBottom: '15px', marginTop: '15px' }}>Leads</Title>
      <Grid>
        {leads?.map((lead) => {
          return <LeadCard key={lead.leadId} lead={lead} refetch={refetchGigs} />;
        })}
      </Grid>

      <ProjectCreate opened={opened} setOpened={setOpened} refetch={refetch} userId={userId} gigs={gigs} />
      {selectedProject && <ProjectEdit opened={openedEdit} setOpened={setOpenedEdit} refetch={refetch} project={selectedProject} />}
    </>
  );
};

export default Projects;
