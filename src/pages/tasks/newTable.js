import { useState } from 'react';
import { useMutation } from 'react-query';
import { TextInput, Loader, Button } from '@mantine/core';
import PropTypes from 'prop-types';
import { createTaskTable } from 'hooks/tasks';
import { IconPlus } from '@tabler/icons-react';
import { useForm, hasLength } from '@mantine/form';

const NewTable = ({ projectId, refetch }) => {
  const [newTable, setNewTable] = useState(false);
  const { mutate, isLoading } = useMutation(['createTable'], (variables) => createTaskTable(variables), {
    onSuccess: () => {
      form.setValues({
        name: ''
      });
      setNewTable(false);
      refetch();
    }
  });

  function handleCreate(name) {
    const variables = { projectId, name };
    return mutate({ variables });
  }

  const form = useForm({
    initialValues: {
      name: ''
    },

    validate: {
      name: hasLength({ min: 2, max: 20 }, 'Name must be 2-20 characters long')
    }
  });

  return (
    <div className="task-table-column task-new-table-column">
      {newTable ? (
        <form onSubmit={form.onSubmit((values) => handleCreate(values.name))}>
          <TextInput
            classNames={{ input: 'task-text-input' }}
            placeholder="Column Name"
            {...form.getInputProps('name')}
            rightSection={isLoading && <Loader size="xs" />}
          />
        </form>
      ) : (
        <Button
          leftIcon={<IconPlus />}
          onClick={() => setNewTable(true)}
          variant="outline"
          style={{ color: '#f1f1f1', borderColor: '#f1f1f1' }}
          fullWidth
        >
          Add Column
        </Button>
      )}
    </div>
  );
};

NewTable.propTypes = {
  projectId: PropTypes.string,
  refetch: PropTypes.func
};

export default NewTable;
