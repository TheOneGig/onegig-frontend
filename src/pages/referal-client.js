// material-ui
import { Container, Grid } from '@mui/material';

// project imports
import ReferalForm from 'sections/extra-pages/contact/ReferalForm';
//import ContactHeader from 'sections/extra-pages/contact/ContactHeader';

// ==============================|| REPORT ISSUE - MAIN ||============================== //

function ReferalClient() {
  return (
    <Grid container spacing={12} justifyContent="center" alignItems="center" sx={{ mb: 12 }}>
      <Grid item xs={12} sm={10} lg={9}>
        <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 2 } }}>
          <ReferalForm />
        </Container>
      </Grid>
    </Grid>
  );
}

export default ReferalClient;
