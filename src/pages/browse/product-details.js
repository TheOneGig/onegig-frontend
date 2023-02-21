import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

// material-ui
import { Box, Grid } from '@mui/material';

// project imports
import ProductImages from 'sections/apps/e-commerce/product-details/ProductImages';
import ProductInfo from './ProductInfo';
import MainCard from 'components/MainCard';
import { getGig } from 'hooks/gigs';
import ProfileTabs from './ProfileTabs';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-details-tabpanel-${index}`}
      aria-labelledby={`product-details-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

// ==============================|| PRODUCT DETAILS - MAIN ||============================== //

const ProductDetails = () => {
  const { id } = useParams();
  const { data: gig, isLoading } = useQuery(['gig'], () => getGig({ gigId: id }));

  if (isLoading) {
    return <div>Loading gig...</div>;
  }

  return (
    <Grid container spacing={3} sx={{ padding: '15px' }}>
      <Grid item xs={12} md={3}>
        <ProfileTabs user={gig?.user} />
      </Grid>
      <Grid item xs={12} md={9}>
        {gig && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <MainCard>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <ProductImages images={gig.files} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <ProductInfo gig={gig} />
                  </Grid>
                </Grid>
              </MainCard>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
