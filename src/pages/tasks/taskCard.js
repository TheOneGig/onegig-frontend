import { useMutation } from 'react-query';
import { Text, ActionIcon, Loader } from '@mantine/core';
import PropTypes from 'prop-types';
import { IconCheck } from '@tabler/icons-react';
import { updateDoneTask } from 'hooks/tasks';

const TaskCard = ({ task, refetch }) => {
  const { mutate, isLoading: loadingDone } = useMutation(['publishGig'], (variables) => updateDoneTask(variables), {
    onSuccess: () => {
      refetch();
    }
  });

  function handleDone() {
    const variables = { taskId: task.taskId, done: !task.done };
    return mutate({ variables });
  }
  return (
    <div className="task-card">
      <ActionIcon color={task.done ? 'lime' : 'gray'} radius="lg" variant="outline" size="sm" onClick={() => handleDone()}>
        {loadingDone ? <Loader size="xs" /> : <IconCheck />}
      </ActionIcon>
      <Text weight={500} className="task-title">
        {task.title}
      </Text>
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.object,
  refetch: PropTypes.func
};

export default TaskCard;
