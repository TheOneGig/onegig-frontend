import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router';
import { Box, Button, Grid, Loader, Modal, TextInput, Title, useMantineTheme } from '@mantine/core';
import IconButton from 'components/@extended/IconButton';
import { CloseOutlined, DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { IconPlus } from '@tabler/icons-react';
import NewTable from './newTable';
import NewTask from './newTask';
import TaskCard from './taskCard';
import { deleteTaskTable, getTasks, updateTaskTable } from 'hooks/tasks';
import { getProject } from 'hooks/projects';
import { Tooltip } from '@mui/material';

// ==============================|| GIGS ||============================== //

const Tasks = () => {
  const theme = useMantineTheme();
  const [newTaskTableId, setNewTaskTableId] = useState('');
  const [openedDelete, setOpenedDelete] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [editId, setEditId] = useState('');
  const [editName, setEditName] = useState('');
  const { projectId } = useParams();
  const { data: project, isLoading: loadingProject } = useQuery(['project'], () => getProject({ projectId }));
  const { data: taskTables, isLoading, refetch } = useQuery(['taskTables'], () => getTasks({ projectId }));
  const { mutate: tableEdit, isLoading: loadingEdit } = useMutation(['editTaskTable'], (variables) => updateTaskTable(variables), {
    onSuccess: () => {
      refetch();
      setEditId('');
      setEditName('');
    }
  });
  const { mutate: tableDelete, isLoading: loadingDelete } = useMutation(['deleteTaskTable'], (variables) => deleteTaskTable(variables), {
    onSuccess: () => {
      refetch();
      setOpenedDelete(false);
    }
  });

  function handleDelete() {
    const variables = { taskTableId: deleteId };
    return tableDelete({ variables });
  }

  function handleEdit() {
    const variables = { taskTableId: editId, name: editName };
    return tableEdit({ variables });
  }

  if (isLoading || loadingProject) {
    return <div>Loading Tasks...</div>;
  }

  const tables = taskTables.sort((taskTable) => taskTable.order);

  return (
    <>
      <Title>Tasks for {project.name}</Title>
      <div className="task-tables-container">
        {tables.map((table) => {
          return (
            <div key={table.taskTableId} className="task-table-column">
              {editId === table.taskTableId ? (
                <TextInput
                  sx={{ height: '50px' }}
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  classNames={{ input: 'task-text-input' }}
                  placeholder="Table name ..."
                  rightSection={
                    loadingEdit ? (
                      <Loader size="xs" />
                    ) : (
                      <>
                        <Tooltip title="Edit">
                          <IconButton onClick={() => handleEdit()}>
                            <SaveOutlined />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Cancel">
                          <IconButton
                            sx={{ color: '#FF0000' }}
                            onClick={() => {
                              setEditId('');
                              setEditName('');
                            }}
                          >
                            <CloseOutlined />
                          </IconButton>
                        </Tooltip>
                      </>
                    )
                  }
                />
              ) : (
                <>
                  <h3 className="task-table-title">{table.name}</h3>
                  <Box
                    sx={{
                      position: 'absolute',
                      right: 10,
                      top: 20
                    }}
                  >
                    <Tooltip title="Edit">
                      <IconButton
                        onClick={() => {
                          setEditId(table.taskTableId);
                          setEditName(table.name);
                        }}
                      >
                        <EditOutlined />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        sx={{ color: '#FF0000' }}
                        onClick={() => {
                          setDeleteId(table.taskTableId);
                          setOpenedDelete(true);
                        }}
                      >
                        <DeleteOutlined />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </>
              )}

              {table.tasks?.map((task) => (
                <TaskCard key={task.taskId} taskTable={table} task={task} refetch={refetch} tables={tables} />
              ))}
              {newTaskTableId === table.taskTableId && (
                <NewTask taskTableId={table.taskTableId} setNewTaskTableId={setNewTaskTableId} refetch={refetch} />
              )}
              <Button leftIcon={<IconPlus />} onClick={() => setNewTaskTableId(table.taskTableId)} variant="outline" color="gray" fullWidth>
                Add Task
              </Button>
            </div>
          );
        })}
        <NewTable projectId={projectId} refetch={refetch} />
      </div>

      <Modal
        opened={openedDelete}
        onClose={() => setOpenedDelete(false)}
        title="Delete Table?"
        overlayColor={theme.colors.dark[9]}
        overlayOpacity={0.55}
        overlayBlur={3}
        centered
      >
        <div>
          <p>Are you sure you want to delete this Table? You will lose all the task in it and this is irreversible!</p>
          <Grid>
            <Grid.Col span={6}>
              <Button
                variant="light"
                color="default"
                mt="md"
                radius="md"
                fullWidth
                onClick={() => setOpenedDelete(false)}
                loading={loadingDelete}
              >
                Cancel
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button variant="light" color="red" mt="md" radius="md" fullWidth onClick={() => handleDelete()} loading={loadingDelete}>
                Yes, I am sure!
              </Button>
            </Grid.Col>
          </Grid>
        </div>
      </Modal>
    </>
  );
};

export default Tasks;
