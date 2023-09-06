// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthClientRegister from 'sections/auth/auth-forms/AuthClientRegister';
// ================================|| LOGIN ||================================ //

const ClientLogin = () => {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Client Site Register</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthClientRegister />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default ClientLogin;
