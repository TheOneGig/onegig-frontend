import { Grid } from '@mui/material';

import useAuth from 'hooks/useAuth';
import ToDoList from 'components/ToDoList';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const ToDoPage = () => {
  const { user } = useAuth();
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} lg={6} sm={8}>
        <ToDoList userId={user.id} />
      </Grid>
    </Grid>
  );
};

export default ToDoPage;
