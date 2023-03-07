import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import PropTypes from 'prop-types';
// material-ui
import { CardContent, Checkbox, FormControlLabel, Grid, Tooltip } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';

// assets
import { PlusCircleOutlined, SendOutlined } from '@ant-design/icons';
import IconButton from 'components/@extended/IconButton';
import { hasLength, useForm } from '@mantine/form';
import { Box, Button, TextInput } from '@mantine/core';
import { createToDo, getToDo, updateDoneTask } from 'hooks/tasks';

// ===========================|| DATA WIDGET - TODO LIST ||=========================== //

const ToDoList = ({ userId }) => {
  const [opened, setOpened] = useState(false);
  const { data: toDos, isLoading, refetch } = useQuery(['todo'], () => getToDo({ userId }));
  const { mutate } = useMutation(['createToDo'], (variables) => createToDo(variables), {
    onSuccess: () => {
      refetch();
      setOpened(false);
      form.setValues({
        title: ''
      });
    }
  });

  const { mutate: done } = useMutation(['doneToDo'], (variables) => updateDoneTask(variables), {
    onSuccess: () => {
      refetch();
    }
  });

  const form = useForm({
    initialValues: {
      title: ''
    },

    validate: {
      title: hasLength({ min: 2, max: 100 }, 'Name must be 2-100 characters long')
    }
  });

  if (isLoading) {
    return <div>Loading to do list...</div>;
  }

  console.log('toDos:', toDos);

  const handleChangeState = (event) => {
    const variables = { taskId: event.target.name, done: event.target.checked };
    return done({ variables });
  };

  const handleSubmit = (values) => {
    const variables = { title: values.title, userId };
    return mutate({ variables });
  };

  return (
    <MainCard
      title="To Do List"
      content={false}
      secondary={
        <Tooltip title="Add Task">
          <IconButton onClick={() => setOpened(true)}>
            <PlusCircleOutlined />
          </IconButton>
        </Tooltip>
      }
      sx={{ '& .MuiCardHeader-root': { p: 1.75 } }}
    >
      <CardContent>
        <Grid container spacing={0} sx={{ '& .Mui-checked + span': { textDecoration: 'line-through' } }}>
          {toDos?.map((todo) => {
            return (
              <Grid item xs={12} key={todo.taskId}>
                <FormControlLabel
                  control={<Checkbox checked={todo.done} onChange={handleChangeState} name={todo.taskId} color="primary" />}
                  label={todo.title}
                />
              </Grid>
            );
          })}
          {opened && (
            <Grid item xs={12}>
              <Box component="form" maw={400} mx="auto" onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <TextInput
                  placeholder="To Do"
                  {...form.getInputProps('title')}
                  rightSection={
                    <Button type="submit">
                      <SendOutlined />
                    </Button>
                  }
                />
              </Box>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </MainCard>
  );
};

ToDoList.propTypes = {
  userId: PropTypes.string
};

export default ToDoList;
