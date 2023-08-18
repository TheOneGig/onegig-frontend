import { Grid, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// ==============================|| READER CARD ||============================== //

function UserCard() {
  const theme = useTheme();
  const user = 'John';

  return (
    <Grid item xs={12}>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
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
              Greetings, {user}
            </Typography>
            <Typography color={theme.palette.grey[0]} variant="h6" sx={{ maxWidth: '55%', pt: 1 }}>
              Your homepage is a central hub equipped with the tools vital for a seamless journey. The navigation bar on your left offers
              streamlined access to pivotal features. You can manage your profile, meticulously track financial activities, engage with us
              via chat, and even schedule remote meetings, optimizing your interaction experience.
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default UserCard;
