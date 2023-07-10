import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router';
import { Box, Button, Grid, Group, Modal, Textarea, Title, Input, Paper, Select, Tooltip } from '@mantine/core';
import IconButton from 'components/@extended/IconButton';
import { DeleteOutlined } from '@ant-design/icons';
import { getProjects, getProject } from 'hooks/projects';
import useAuth from 'hooks/useAuth';
import { CheckCircleOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { useTheme } from '@mui/material/styles';
import { getNotes, createNote, deleteNote, updateNote } from 'hooks/notes';

const Notes = () => {
  const theme = useTheme();
  const [newNote, setNewNote] = useState('');
  const [newBulletPoints, setNewBulletPoints] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [opened, setOpened] = useState(false);
  const { projectId } = useParams();
  const { user } = useAuth();
  const userId = user.id;
  const { data: notes, isLoading: loadingNotes, refetch } = useQuery(['notes'], () => getNotes({ userId }));
  const { data: projects, isLoading: loadingProjects, refetch: refetchProjects } = useQuery(['projects'], () => getProjects({ userId }));
  const { data: project, isLoading: loadingProject } = useQuery(['project'], () => getProject({ projectId }));

  const { mutate, isLoading } = useMutation(['createNote'], (variables) => createNote(variables), {
    onSuccess: () => {
      refetch();
      setOpened(false);
      // Add your notification function here. 
      showNotification({
        id: 'load-data',
        color: 'teal',
        title: 'Note Saved!',
        message: 'Congratulations! your note was saved succesfully, you can close this notification',
        icon: <IconCheck size="1rem" />,
        autoClose: 3000
      });
    }
  });

  function handleDelete(note) {
    const variables = { noteId: note.noteId };
    return deleteNote.mutate(variables);
  }

  function handleSubmit() {
    const variables = {
      noteContent: newNote,
      bulletPoints: newBulletPoints,
      project: selectedProject,
      userId
    };
    console.log(variables)
    return mutate(variables);
  }

  console.log(notes)
  return (
    <>
      <Title>Notes for {project?.name}</Title>
        <Group mt={4} position="center"  style={{ minHeight: 100}}>
          <Button sx={{fontSize: '20px', width: 300, height: 40 }} onClick={() => setOpened(true)} className="create-btn blue-btn" variant="light">
              Add a new Note
          </Button>
        </Group>
      <div className="task-tables-container">
        <Grid>
          {notes && notes.map((note, index) => (
            <Paper padding="md" style={{ marginTop: '15px' }} key={index}>
              <Title order={4}>{note.project}</Title>
              <p>{note.note}</p>
              <p>{note.bulletPoints}</p>
            </Paper>
          ))}
        </Grid>
      </div>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Add a new note" 
      overlayColor={theme.colors.dark[9]}
      overlayOpacity={0.55}
      overlayBlur={3}
      height={300}
      centered>
        <Select
          placeholder="Add to a Project"
          value={selectedProject}
          onChange={(selectedOption) => setSelectedProject(selectedOption)}
          data={projects && projects.length > 0 ? projects.map(project => ({ value: project.name, label: project.name })) : [{ value: 'no-projects', label: 'No Projects Found' }]}
        />
        <Textarea placeholder="Note" value={newNote} onChange={(e) => setNewNote(e.target.value)} />
        <Textarea placeholder="Bullet points" value={newBulletPoints} onChange={(e) => setNewBulletPoints(e.target.value)} />
        <Button onClick={handleSubmit}>Add Note</Button>
      </Modal>
    </>
  );
};

export default Notes;
