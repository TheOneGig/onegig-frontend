// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Checkbox, Grid, Stack, TextField, Typography } from '@mui/material';

// select project-budget

// ==============================|| CONTACT US - FORM ||============================== //

function ContactForm() {
  const theme = useTheme();

  return (
    <Box sx={{ p: { xs: 2.5, sm: 0 } }}>
      <Grid container spacing={5} justifyContent="center">
        <Grid item xs={12} sm={10} lg={9}>
          <Stack alignItems="center" justifyContent="center" spacing={2}>
            <Button align="center" variant="text" sx={{ p: 0, textTransform: 'none', '&:hover': { bgcolor: 'transparent' } }}>
              Get In touch
            </Button>
            <Typography align="center" variant="h2">
              Sent a message to OneGig HQ
            </Typography>
            <Typography variant="caption" align="center" color="textSecondary" sx={{ maxWidth: '355px' }}>
              Every message is important to us, our users feedback helps us improve and deliver higher quality products.
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={10} lg={9}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth type="text" placeholder="Name" sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth type="text" placeholder="Company Name" sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth type="email" placeholder="Email Address" sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth type="number" placeholder="Phone Number" sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth multiline rows={4} placeholder="Message" sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={10} lg={9}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1 }}
            justifyContent="space-between"
            alignItems={{ xs: 'stretch', sm: 'center' }}
          >
            <Stack direction="row" alignItems="center" sx={{ ml: -1 }}>
              <Checkbox sx={{ '& .css-1vjb4cj': { borderRadius: '2px' } }} defaultChecked />
              <Typography>
                By submitting this, you agree to the{' '}
                <Typography sx={{ cursor: 'pointer' }} component="span" color={theme.palette.primary.main}>
                  Privacy Policy
                </Typography>{' '}
                and{' '}
                <Typography sx={{ cursor: 'pointer' }} component="span" color={theme.palette.primary.main}>
                  Cookie Policy
                </Typography>{' '}
              </Typography>
            </Stack>
            <Button variant="contained" sx={{ ml: { xs: 0 } }}>
              Submit
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ContactForm;
