import { useState } from 'react';
import { useMutation } from 'react-query';
import PropTypes from 'prop-types';
import { IconCheck } from '@tabler/icons-react';
import { updateDoneTask, updateTask } from 'hooks/tasks';
import { Text, ActionIcon, Loader, Drawer, Box, TextInput, Textarea, Group, Button } from '@mantine/core';
import { useForm, hasLength } from '@mantine/form';
import { DatePicker } from '@mantine/dates';
import dayjs from 'dayjs';

const TaskCard = ({ task, refetch }) => {
  const [opened, setOpened] = useState(false);

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

  function handleDone(e) {
    e.stopPropagation();
    const variables = { taskId: task.taskId, done: !task.done };
    return mutate({ variables });
  }

  function handleUpdate(values) {
    const { title, description, dueDate } = values;
    const variables = { taskId: task.taskId, title, description, dueDate };
    return editTask({ variables });
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
  return (
    <>
      <Box className="task-card" onClick={() => setOpened(true)}>
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
    </>
  );
};

TaskCard.propTypes = {
  task: PropTypes.object,
  refetch: PropTypes.func
};

export default TaskCard;
