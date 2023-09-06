import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import PropTypes from 'prop-types';
// material-ui
import { CardContent, Grid } from '@mui/material';
// project imports
import MainCard from 'components/MainCard';
// assets
import { EyeOutlined } from '@ant-design/icons';
import IconButton from 'components/@extended/IconButton';

import { Button, Textarea, Tooltip, Select } from '@mantine/core';
import { getProjects } from 'hooks/projects';
import { showNotification } from '@mantine/notifications';
import { useNavigate } from 'react-router';

import { IconCheck } from '@tabler/icons-react';
import { createNote } from 'hooks/notes';
// ===========================|| DATA WIDGET - TODO LIST ||=========================== //

const Notes = ({ userId, handleClose }) => {
  const history = useNavigate();
  const [newNote, setNewNote] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const { data: projects, isLoading: loadingProjects, refetch } = useQuery(['projects'], () => getProjects({ userId }));
  const { mutate, isLoading } = useMutation(['createNote'], (variables) => createNote(variables), {
    onSuccess: () => {
      refetch();
      showNotification({
        id: 'load-data',
        color: 'teal',
        title: 'Note Saved!',
        message: 'Congratulations! your note was saved succesfully, you can close this notification',
        icon: <IconCheck size="1rem" />,
        autoClose: 3000
      });
      setNewNote('');
      setSelectedProject(null);
      handleClose(false);
    }
  });

  if (isLoading || loadingProjects) {
    return <div>Loading Notes...</div>;
  }

  function handleSubmit() {
    const variables = {
      noteContent: newNote,
      project: selectedProject,
      userId
    };
    return mutate({ variables });
  }

  return (
    <MainCard
      title="Notes"
      content={false}
      secondary={
        <>
          <Tooltip label="View All" color="#1dbeea">
            <IconButton onClick={() => history('/notes')}>
              <EyeOutlined />
            </IconButton>
          </Tooltip>
        </>
      }
      sx={{ height: '430px', '& .MuiCardHeader-root': { p: 1.75 } }}
    >
      <CardContent component="form" mx="auto">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Select
              label="Add to a Project"
              placeholder="Select Project"
              value={selectedProject}
              onChange={(selectedOption) => setSelectedProject(selectedOption)}
              data={
                projects && projects.length > 0
                  ? projects.map((project) => ({ value: project.name, label: project.name }))
                  : [{ value: 'no-projects', label: 'No Projects Found' }]
              }
            />
            <Textarea minRows={5} autosize placeholder="Note" value={newNote} onChange={(e) => setNewNote(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={handleSubmit}>Add Note</Button>
          </Grid>
        </Grid>
      </CardContent>
    </MainCard>
  );
};

Notes.propTypes = {
  userId: PropTypes.string
};

export default Notes;
