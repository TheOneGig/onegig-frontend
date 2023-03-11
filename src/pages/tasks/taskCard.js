import { useState } from 'react';
import { useMutation } from 'react-query';
import PropTypes from 'prop-types';
import { IconCheck } from '@tabler/icons-react';
import {
  Text,
  ActionIcon,
  Loader,
  Drawer,
  Box,
  TextInput,
  Textarea,
  Group,
  Button,
  Select,
  Grid,
  Modal,
  useMantineTheme
} from '@mantine/core';
import { useForm, hasLength } from '@mantine/form';
import { DatePicker } from '@mantine/dates';
import dayjs from 'dayjs';
import { Tooltip } from '@mui/material';
import IconButton from 'components/@extended/IconButton';
import { DeleteOutlined } from '@ant-design/icons';
import { deleteTask, updateDoneTask, updateTask } from 'hooks/tasks';

const TaskCard = ({ task, taskTable, refetch, tables }) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [taskTableId, setTaskTableId] = useState(taskTable.taskTableId);
  const [openedDelete, setOpenedDelete] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  const { mutate: editTask, isLoading } = useMutation(['updateTask'], (variables) => updateTask(variables), {
    onSuccess: () => {
      refetch();
      setOpened(false);
    }
  });

  const { mutate, isLoading: loadingDone } = useMutation(['updateDone'], (variables) => updateDoneTask(variables), {
    onSuccess: () => {
      refetch();
    }
  });

  const { mutate: taskDelete, isLoading: loadingDelete } = useMutation(['deleteTask'], (variables) => deleteTask(variables), {
    onSuccess: () => {
      refetch();
      setOpenedDelete(false);
    }
  });

  function handleDone(e) {
    e.stopPropagation();
    const variables = { taskId: task.taskId, done: !task.done };
    return mutate({ variables });
  }

  function handleUpdate(values) {
    const { title, description, dueDate } = values;
    const variables = { taskId: task.taskId, title, description, dueDate, taskTableId };
    return editTask({ variables });
  }

  function handleDelete() {
    const variables = { taskId: deleteId };
    return taskDelete({ variables });
  }

  const form = useForm({
    initialValues: {
      title: task.title,
      description: task.description ? task.description : '',
      dueDate: task.dueDate && new Date(task.dueDate)
    },

    validate: {
      title: hasLength({ min: 2, max: 20 }, 'Title must be 2-20 characters long')
    }
  });

  const taskTablesOptions = tables.map((table) => {
    return { label: table.name, value: table.taskTableId };
  });

  function selectTaskTable(id) {
    const taskTable = tables.find((table) => id === table.taskTableId);
    setTaskTableId(taskTable.taskTableId);
  }

  return (
    <>
      <Box className="task-card" onClick={() => setOpened(true)}>
        <Box
          sx={{
            position: 'absolute',
            right: 5,
            top: 5
          }}
        >
          <Tooltip title="Delete">
            <IconButton
              sx={{ color: '#FF0000' }}
              onClick={(e) => {
                e.stopPropagation();
                setDeleteId(task.taskId);
                setOpenedDelete(true);
              }}
            >
              <DeleteOutlined />
            </IconButton>
          </Tooltip>
        </Box>
        <ActionIcon color={task.done ? 'lime' : 'gray'} radius="lg" variant="outline" size="sm" onClick={handleDone}>
          {loadingDone ? <Loader size="xs" /> : <IconCheck />}
        </ActionIcon>
        <Text weight={500} className="task-title">
          {task.title}
        </Text>
        {task.dueDate && <Text className="task-dueDate">{dayjs(task.dueDate).format('MMM-DD')}</Text>}
      </Box>

      <Drawer opened={opened} onClose={() => setOpened(false)} title={task.title} padding="xl" size="xl" position="right">
        <Box component="form" maw={400} mx="auto" onSubmit={form.onSubmit((values) => handleUpdate(values))}>
          <Select label="Table" placeholder="Pick a Table" data={taskTablesOptions} value={taskTableId} onChange={selectTaskTable} />
          <TextInput label="Title" placeholder="Title" {...form.getInputProps('title')} />
          <Textarea label="Description" placeholder="Brief description of this task..." mt="md" {...form.getInputProps('description')} />
          <DatePicker placeholder="Pick due date" label="Due date" {...form.getInputProps('dueDate')} />
          <Group position="right" mt="md">
            <Button color="gray" onClick={() => setOpened(false)} loading={isLoading}>
              Cancel
            </Button>
            <Button type="submit" loading={isLoading}>
              Submit
            </Button>
          </Group>
        </Box>
      </Drawer>

      <Modal
        opened={openedDelete}
        onClose={() => setOpenedDelete(false)}
        title="Delete Task?"
        overlayColor={theme.colors.dark[9]}
        overlayOpacity={0.55}
        overlayBlur={3}
        centered
      >
        <div>
          <p>Are you sure you want to delete this Task? This is irreversible!</p>
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

TaskCard.propTypes = {
  task: PropTypes.object,
  refetch: PropTypes.func,
  tables: PropTypes.array,
  taskTable: PropTypes.object
};

export default TaskCard;
