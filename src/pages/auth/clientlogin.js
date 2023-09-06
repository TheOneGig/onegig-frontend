// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthClientLogin from 'sections/auth/auth-forms/AuthClientLogin';
// ================================|| LOGIN ||================================ //

const ClientLogin = () => {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Client Site Login</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthClientLogin />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default ClientLogin;
