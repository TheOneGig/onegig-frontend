import { useMutation } from 'react-query';
import { TextInput, Loader } from '@mantine/core';
import PropTypes from 'prop-types';
import { createTask } from 'hooks/tasks';
import { useForm, hasLength } from '@mantine/form';

const NewTask = ({ taskTableId, refetch, setNewTaskTableId }) => {
  const { mutate, isLoading } = useMutation(['createTask'], (variables) => createTask(variables), {
    onSuccess: () => {
      form.setValues({
        title: ''
      });
      setNewTaskTableId('');
      refetch();
    }
  });

  function handleCreate(title) {
    const variables = { taskTableId, title };
    return mutate({ variables });
  }

  const form = useForm({
    initialValues: {
      title: ''
    },

    validate: {
      title: hasLength({ min: 2, max: 20 }, 'Title must be 2-20 characters long')
    }
  });

  return (
    <>
      <div className="new-task-card">
        <form onSubmit={form.onSubmit((values) => handleCreate(values.title))}>
          <TextInput placeholder="Task title..." {...form.getInputProps('title')} rightSection={isLoading && <Loader size="xs" />} />
        </form>
      </div>
    </>
  );
};

NewTask.propTypes = {
  taskTableId: PropTypes.string,
  refetch: PropTypes.func,
  setNewTaskTableId: PropTypes.func
};

export default NewTask;
