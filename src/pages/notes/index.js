import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router';

import { Box, Button, Grid, Group, Modal, Textarea, Title, Input, Paper, Select, Tooltip, Badge, Card, Text } from '@mantine/core';
import IconButton from 'components/@extended/IconButton';
import { DeleteOutlined } from '@ant-design/icons';
import { getProjects, getProject } from 'hooks/projects';
import useAuth from 'hooks/useAuth';
import { useForm, hasLength } from '@mantine/form';
import { showNotification } from '@mantine/notifications';

import { IconCheck } from '@tabler/icons-react';
import { useTheme } from '@mui/material/styles';
import { getNotes, createNote, deleteNote, updateNote } from 'hooks/notes';
import { maxWidth } from '@mui/system';

const Notes = () => {
  const theme = useTheme();
  const [newNote, setNewNote] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [opened, setOpened] = useState(false);
  const [actionOpened, setActionOpened] = useState(false);
  const [editOpened, setEditOpened] = useState(false);
  const [editNote, setEditNote] = useState('');
  const [noteId, setNoteId] = useState(null);
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
    }
  });

  const { mutate: noteDelete, isLoading: loadingDelete } = useMutation(['deleteNote'], (variables) => deleteNote(variables), {
    onSuccess: () => {
      refetch();
      showNotification({
        id: 'load-data',
        color: 'red',
        title: 'Note Deleted!',
        message: 'Your Note was deleted succesfully, you can close this notification',
        icon: <IconCheck size="1rem" />,
        autoClose: 3000
      });
    }
  });

  const { mutate: noteUpdate, isLoading: loadingUpdate } = useMutation(['updateNote'], (variables) => updateNote(variables), {
    onSuccess: () => {
      refetch();
      setEditOpened(false);
      showNotification({
        id: 'load-data',
        color: 'blue',
        title: 'Note Updated!',
        message: 'Your note was updated succesfully, you can close this notification',
        icon: <IconCheck size="1rem" />,
        autoClose: 3000
      });
      setNewNote('');
      setSelectedProject(null);
    }
  });

  const form = useForm({
    initialValues: {
      noteContent: '',
      bulletPoints: '',
      project: 'Unselected'
    }
  });

  function handleDelete(noteId) {
    const variables = { noteId };
    return noteDelete({ variables });
  }

  function handleSubmit() {
    const variables = {
      noteContent: newNote,
      project: selectedProject,
      userId
    };
    return mutate({ variables });
  }

  function handleEdit() {
    const variables = {
      noteId: noteId,
      noteContent: newNote,
      project: selectedProject
    };
    return noteUpdate({ variables });
  }

  function handleNoteClicked(note) {
    setActionOpened(true);
    setEditNote(note);
  }

  function handleEditOpen(note) {
    setEditOpened(true);
    setNewNote(note.noteContent);
    setSelectedProject(note.project);
    setNoteId(note.noteId);
  }

  return (
    <>
      <Title>Notes for {project?.name}</Title>
      <Group mt={4} position="center" style={{ minHeight: 100 }}>
        <Button
          sx={{ fontSize: '20px', width: 300, height: 40 }}
          onClick={() => setOpened(true)}
          className="create-btn blue-btn"
          variant="light"
        >
          Add a new Note
        </Button>
      </Group>
      <div className="task-tables-container">
        <Grid>
          {notes &&
            notes.map((note, index) => (
              <Grid.Col key={note.noteId} xs={12} lg={3} sm={6}>
                <Card onClick={() => handleNoteClicked} p="lg" radius="md" shadow="sm" withBorder>
                  <Group position="apart" mb="md">
                    <Text> </Text>
                    <Badge color="#1dbeea" variant="light">
                      {note.project}
                    </Badge>
                  </Group>
                  <p>{note.noteContent}</p>
                  <p>{note.bulletPoints}</p>
                </Card>
              </Grid.Col>
            ))}
        </Grid>
      </div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add a new note"
        overlayColor={theme.colors.dark[9]}
        overlayOpacity={0.55}
        overlayBlur={3}
        centered
      >
        <Box component="form" mx="auto">
          <Grid>
            <Grid.Col span={12}>
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
            </Grid.Col>
            <Grid.Col span={12}>
              <Textarea placeholder="Note" value={newNote} onChange={(e) => setNewNote(e.target.value)} />
            </Grid.Col>
            <Grid.Col span={12}>
              <Button onClick={handleSubmit}>Add Note</Button>
            </Grid.Col>
          </Grid>
        </Box>
      </Modal>
      <Modal
        opened={actionOpened}
        onClose={() => setActionOpened(false)}
        title="Note Action"
        overlayColor={theme.colors.dark[9]}
        overlayOpacity={0.55}
        overlayBlur={3}
        centered
      >
        <Box mx="auto">
          <Grid>
            <Grid.Col span={6}>
              <Button fullWidth className="blue-btn" onClick={() => setEditOpened(true)}>
                Edit
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button fullWidth className="red-btn" onClick={handleDelete}>
                Delete
              </Button>
            </Grid.Col>
          </Grid>
        </Box>
      </Modal>
      <Modal
        opened={handleEditOpen}
        onClose={() => setEditOpened(false)}
        title="Edit note"
        overlayColor={theme.colors.dark[9]}
        overlayOpacity={0.55}
        overlayBlur={3}
        centered
      >
        <Box component="form" mx="auto">
          <Grid>
            <Grid.Col span={12}>
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
            </Grid.Col>
            <Grid.Col span={12}>
              <Textarea placeholder="Note" value={newNote} onChange={(e) => setNewNote(e.target.value)} />
            </Grid.Col>
            <Grid.Col span={12}>
              <Button onClick={handleEdit}>Edit Note</Button>
            </Grid.Col>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default Notes;
