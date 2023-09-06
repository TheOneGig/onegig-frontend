// material-ui
import { Box, Grid, LinearProgress, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ActionIcon, Text } from '@mantine/core';

// project import
import MainCard from 'components/MainCard';

// assets
import Reader from 'assets/images/analytics/reader.svg';

// ==============================|| READER CARD ||============================== //

function SeatsCard() {
  const theme = useTheme();

  return (
    <Grid item xs={12}>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={7}
          sx={{
            bgcolor: `${theme.palette.primary.main}`,
            position: 'relative',
            p: 2.75,
            borderRadius: { xs: 2, sm: '8px 0px 0px 8px' },
            overflow: 'hidden'
          }}
        >
          <Stack>
            <Typography variant="h5" color="white">
              Welcome to the Admin Site!
            </Typography>
            <Typography variant="h6" color="white">
              {' '}
              Here you will have all the tools to manage your workspace, your team and subscription.
            </Typography>
            <Typography variant="h4" color="white" sx={{ pt: 8, pb: 1, zIndex: 1 }}>
              You have 100% of your team seats occupied.
            </Typography>
            <Box sx={{ maxWidth: '60%' }}>
              <LinearProgress variant="determinate" color="success" value={100} />
            </Box>
            <Box sx={{ position: 'absolute', bottom: -7, right: 0 }}>
              <img alt="reder" src={Reader} />
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={5}>
          <MainCard sx={{ borderRadius: { xs: 2, sm: '0px 8px 8px 0px' }, height: '100%', mt: { xs: 2.5, sm: 0 } }}>
            <Grid item xs={12}>
              <Stack sx={{ marginTop: '30px' }} direction="column" alignItems="center" spacing={6}>
                <Typography variant="h1">Need to add more members for your team?</Typography>
                <ActionIcon sx={{ width: '100%' }} color="green" variant={'contained'}>
                  <Text>Upgrade Now</Text>
                </ActionIcon>
              </Stack>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SeatsCard;
