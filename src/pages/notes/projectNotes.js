import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router';

import { Box, Button, Grid, Group, Modal, Textarea, Title, Select, Badge, Card, Text } from '@mantine/core';
import { getProject } from 'hooks/projects';
import useAuth from 'hooks/useAuth';
import { showNotification } from '@mantine/notifications';

import { IconCheck } from '@tabler/icons-react';
import { useTheme } from '@mui/material/styles';
import { getNotes, createNote, deleteNote, updateNote } from 'hooks/notes';

const Notes = () => {
  const theme = useTheme();
  const [newNote, setNewNote] = useState('');
  const [opened, setOpened] = useState(false);
  const [actionOpened, setActionOpened] = useState(false)
  const [editOpened, setEditOpened] = useState(false)
  const [editNote, setEditNote] = useState('')
  const [noteId, setNoteId] = useState(null)
  const { projectId } = useParams();
  const { user } = useAuth();
  const userId = user.id;
  const { data: notes, isLoading: loadingNotes, refetch } = useQuery(['notes'], () => getNotes({ userId }));
  const { data: project, isLoading: loadingProject, refetch:refetchProject } = useQuery(['project'], () => getProject({ projectId }));
 
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
      setNewNote('')
    }
  });

  const { mutate: noteDelete } = useMutation(['deleteNote'], (variables) => deleteNote(variables), {
    onSuccess: () => {
      refetch();
      setActionOpened(false);
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
      setNewNote('')
    }
  });

  if (isLoading || loadingProject ) {
    return <div>Loading Notes...</div>;
  }

  function handleDelete() {
    if (editNote) { 
      const noteId = editNote.noteId
      const variables = { noteId };
      return noteDelete({ variables });
    } else {
      console.log('No note selected for deletion');
    }
  }

  function handleSubmit() {
    const variables = {
      noteContent: newNote,
      project: project.name,
      userId
    };
    return mutate({variables});
  }

  function handleEdit() {
    const variables = { 
      noteId: noteId,
      noteContent: newNote,
      project: project.name 
    };
    return noteUpdate({ variables });
  }

  function handleNoteClicked(note){
    setActionOpened(true)
    setEditNote(note)
  }

  function handleEditOpen() {
    setActionOpened(false)
    setEditOpened(true)
    setNewNote(editNote.noteContent)
    setNoteId(editNote.noteId)
  }

  const noteData = notes.filter(note => note.project === project.name);

  return (
    <>
      <Title>Notes for {project.name}</Title>
        <Group mt={4} position="center"  style={{ minHeight: 100}}>
          <Button sx={{fontSize: '20px', width: 300, height: 40 }} onClick={() => setOpened(true)} className="create-btn blue-btn" variant="light">
              Add a new Note
          </Button>
        </Group>
      <div className="task-tables-container">
        <Grid>
          {notes && noteData.map((note) => (
            <Grid.Col key={note.noteId} xs={12} lg={3} sm={6}>
              <Card onClick={() => handleNoteClicked(note)} p="lg" radius="md" shadow="sm" withBorder>
                <Group position="apart" mb="md">
                  <Text> </Text>
                  <Badge  color="#1dbeea" variant="light">{note.project}</Badge>
                </Group>
                <div style={{ minHeight: '112px' }}>
                  <Text>{note.noteContent}</Text>
                </div>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </div>
      <Modal opened={opened} onClose={() => setOpened(false)} title="New note" 
          overlayColor={theme.colors.dark[9]}
          overlayOpacity={0.55}
          overlayBlur={3}
          centered>
         <Box component="form" mx="auto">
          <Grid>
            <Grid.Col span={12}>
              <Textarea minRows={5} autosize placeholder="Note" value={newNote} onChange={(e) => setNewNote(e.target.value)} />
            </Grid.Col>
            <Grid.Col span={12}>
              <Button onClick={handleSubmit}>Add Note</Button>
            </Grid.Col>
          </Grid>
        </Box>
      </Modal>
      <Modal opened={actionOpened} onClose={() => setActionOpened(false)} title="Note Action" 
        overlayColor={theme.colors.dark[9]}
        overlayOpacity={0.55}
        overlayBlur={3}
        centered>
         <Box mx="auto">
          <Grid>
            <Grid.Col span={6}>
              <Button fullWidth className='blue-btn' onClick={handleEditOpen}>Edit</Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button fullWidth className='red-btn' onClick={handleDelete}>Delete</Button>
            </Grid.Col>
          </Grid>
        </Box>
      </Modal>
      <Modal opened={editOpened} onClose={() => setEditOpened(false)} title="Edit note" 
          overlayColor={theme.colors.dark[9]}
          overlayOpacity={0.55}
          overlayBlur={3}
          centered>
         <Box component="form" mx="auto">
          <Grid>
            <Grid.Col span={12}>
              <Textarea minRows={5} autosize placeholder="Note" value={newNote} onChange={(e) => setNewNote(e.target.value)} />
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


