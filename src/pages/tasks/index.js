import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { Button, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import NewTable from './newTable';
import NewTask from './newTask';
import TaskCard from './taskCard';
import { getTasks } from 'hooks/tasks';
import { getProject } from 'hooks/projects';

// ==============================|| GIGS ||============================== //

const Tasks = () => {
  const [newTaskTableId, setNewTaskTableId] = useState('');
  const { projectId } = useParams();
  const { data: project, isLoading: loadingProject } = useQuery(['project'], () => getProject({ projectId }));
  const { data: taskTables, isLoading, refetch } = useQuery(['taskTables'], () => getTasks({ projectId }));
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
              <h3 className="task-table-title">{table.name}</h3>
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
      </div>
    </>
  );
};

export default Tasks;
