// material-ui
import { Grid } from '@mui/material';

// project imports
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import ReaderCard from 'sections/dashboard/analytics/ReaderCard';

// ===========================|| WIDGET - STATISTICS ||=========================== //

const WidgetStatistics = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Page Views" count="4,42,236" percentage={59.3} extra="35,000" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Users" count="78,250" percentage={70.5} color="success" extra="8,900" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Order" count="18,800" percentage={27.4} isLoss color="warning" extra="1,943" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Sales" count="$35,078" percentage={27.4} isLoss color="error" extra="$20,395" />
      </Grid>

      <Grid item xs={12} md={8} lg={12}>
        <ReaderCard />
      </Grid>
    </Grid>
  );
};

export default WidgetStatistics;
