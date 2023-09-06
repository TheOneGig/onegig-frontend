import { Link } from 'react-router-dom';

// project import
import config from 'config';

// material-ui
import { useTheme } from '@mui/material/styles';
import useAuth from 'hooks/useAuth';
import useWorkspace from 'hooks/useWorkspace';
import { useMediaQuery, Box, Button, Grid, Stack, Typography } from '@mui/material';

// assets
import error500 from 'assets/images/maintenance/Error500.png';

// ==============================|| ERROR 500 - MAIN ||============================== //

function Error500() {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const user = useAuth();
  console.log(user);
  const { workspaceId } = useWorkspace();

  return (
    <>
      <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Box sx={{ width: { xs: 350, sm: 396 } }}>
            <img src={error500} alt="mantis" style={{ height: '100%', width: '100%' }} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Stack justifyContent="center" alignItems="center">
            <Typography align="center" variant={matchDownSM ? 'h2' : 'h1'}>
              Internal Server Error
            </Typography>
            <Typography color="textSecondary" variant="body2" align="center" sx={{ width: { xs: '73%', sm: '70%' }, mt: 1 }}>
              Server error 500. we fixing the problem. please try again at a later stage.
            </Typography>
            <Button component={Link} to={`/${workspaceId}/dashboard`} variant="contained" sx={{ textTransform: 'none', mt: 4 }}>
              Go to homepage
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default Error500;
