import PropTypes from 'prop-types';

// material-ui
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// assets
import { FallOutlined, RiseOutlined } from '@ant-design/icons';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const AnalyticEcommerce = ({ color = 'primary', title, count, isLoss, extra }) => (
  <MainCard contentSX={{ p: 2.25 }}>
    <Stack spacing={0.5}>
      <Typography variant="h6" color="textSecondary">
        {title}
      </Typography>
      <Grid container alignItems="center">
        <Grid item>
          <Typography variant="h4" color="inherit">
            {count}
          </Typography>
        </Grid>
      </Grid>
    </Stack>
    <Box sx={{ pt: 2.25 }}>
      
    </Box>
  </MainCard>
);

AnalyticEcommerce.propTypes = {
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  color: PropTypes.string,
  extra: PropTypes.string
};

export default AnalyticEcommerce;
