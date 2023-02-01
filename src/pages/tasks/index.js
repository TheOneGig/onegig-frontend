import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
// material-ui
import { Button, Flex, Title } from '@mantine/core';
import { getTasks } from 'hooks/tasks';
import NewTable from './newTable';
import { IconPlus } from '@tabler/icons-react';
import NewTask from './newTask';
import TaskCard from './taskCard';

// ==============================|| GIGS ||============================== //

const Tasks = () => {
  const [newTaskTableId, setNewTaskTableId] = useState('');
  const { projectId } = useParams();
  const { data: taskTables, isLoading, refetch } = useQuery(['taskTables'], () => getTasks({ projectId }));
  if (isLoading) {
    return <div>Loading Tasks...</div>;
  }

  const tables = taskTables.sort((taskTable) => taskTable.order);

  return (
    <>
      <Title>Tasks</Title>
      <Flex mih={50} gap="md" justify="flex-start" align="flex-start" direction="row" wrap="wrap">
        {tables.map((table) => {
          return (
            <div key={table.taskTableId} className="task-table-column">
              <h3>{table.name}</h3>
              {table.tasks?.map((task) => (
                <TaskCard key={task.taskId} task={task} refetch={refetch} />
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
      </Flex>
    </>
  );
};

export default Tasks;
