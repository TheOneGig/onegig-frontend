// material-ui
import { AvatarGroup, Box, Button, Divider, Grid, LinearProgress, Stack, Typography, Card, CardContent } from '@mui/material';
// project imports
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import SeatsCard from 'pages/adminSite/insights/SeatsCard';
import MainCard from 'components/MainCard';

// ===========================|| WIDGET - STATISTICS ||=========================== //

const AdminInsights = () => {
  return (
    <Grid container spacing={7}>
      <Grid item xs={12} md={8} lg={12}>
        <SeatsCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={6}>
        <AnalyticEcommerce title="Projects" count="12,000" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={6}>
        <AnalyticEcommerce title="Clients" count="7,000" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={6}>
        <MainCard contentSX={{ p: 2.25 }}>
          <Stack spacing={0.5}>
            <Typography variant="h6" color="textSecondary">
              Revenues
            </Typography>
            <Grid container alignItems="center">
              <Grid item>
                <Typography variant="h4" color="inherit">
                  $2,000,000
                </Typography>
              </Grid>
            </Grid>
          </Stack>
          <Box sx={{ pt: 2.25 }}></Box>
        </MainCard>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={6}>
        <AnalyticEcommerce title="Team Members" count="300" />
      </Grid>
      
    </Grid>
  );
};

export default AdminInsights;
