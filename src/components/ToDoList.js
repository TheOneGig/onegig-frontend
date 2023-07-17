import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import PropTypes from 'prop-types';
// material-ui
import { CardContent, Checkbox, FormControlLabel, Grid } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';

// assets
import { EyeOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import IconButton from 'components/@extended/IconButton';
import { hasLength, useForm } from '@mantine/form';
import { Box, Button, TextInput, Tooltip } from '@mantine/core';
import { createToDo, getToDo, updateDoneTask } from 'hooks/tasks';

// ===========================|| DATA WIDGET - TODO LIST ||=========================== //

const ToDoList = ({ userId }) => {
  const [opened, setOpened] = useState(false);
  const [viewDone, setViewDone] = useState(false);
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

  const handleChangeState = (event) => {
    const variables = { taskId: event.target.name, done: event.target.checked };
    return done({ variables });
  };

  const handleSubmit = (values) => {
    const variables = { title: values.title, userId };
    return mutate({ variables });
  };

  const filteredTodos = viewDone ? toDos : toDos.filter((t) => !t.done);

  return (
    <MainCard
      title="To Do List"
      content={false}
      secondary={
        <>
          <Tooltip label="View Done" color="#1dbeea">
            <IconButton onClick={() => setViewDone(!viewDone)}>
              <EyeOutlined />
            </IconButton>
          </Tooltip>
          <Tooltip label="Add Task" color="#1dbeea">
            <IconButton onClick={() => setOpened(!opened)}>
              <PlusCircleOutlined />
            </IconButton>
          </Tooltip>
        </>
      }
      sx={{ height: '430px', '& .MuiCardHeader-root': { p: 1.75 } }}
    >
      <CardContent>
        <Grid
          container
          spacing={0}
          sx={{
            height: opened ? '270px' : '320px',
            paddingLeft: '10px',
            overflowY: 'scroll',
            display: 'block',
            '& .Mui-checked + span': { textDecoration: 'line-through' }
          }}
        >
          {filteredTodos?.map((todo) => {
            return (
              <Grid item xs={12} key={todo.taskId}>
                <FormControlLabel
                  control={<Checkbox checked={todo.done} onChange={handleChangeState} name={todo.taskId} color="primary" />}
                  label={todo.title}
                />
              </Grid>
            );
          })}
        </Grid>
        {opened && (
          <Grid container spacing={1} sx={{ width: '100%' }}>
            <Grid item xs={12}>
              <Box component="form" maw={400} mx="auto" onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <TextInput
                  placeholder="To Do"
                  {...form.getInputProps('title')}
                  rightSection={
                    <Button type="submit" className="right-section-btn">
                      <PlusOutlined />
                    </Button>
                  }
                />
              </Box>
            </Grid>
          </Grid>
        )}
      </CardContent>
    </MainCard>
  );
};

ToDoList.propTypes = {
  userId: PropTypes.string
};

export default ToDoList;
