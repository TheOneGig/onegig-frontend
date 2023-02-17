import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Box, Button, CardContent, CardMedia, Divider, Grid, Rating, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import SkeletonProductPlaceholder from 'components/cards/skeleton/ProductPlaceholder';
import { formatUSD } from 'hooks/formatUSD';

// ==============================|| PRODUCT CARD ||============================== //

const ProductCard = ({ id, name, user, image, price, rating }) => {
  const history = useNavigate();
  const [productRating] = useState(rating);

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <SkeletonProductPlaceholder />
      ) : (
        <MainCard
          content={false}
          boxShadow
          sx={{
            '&:hover': {
              transform: 'scale3d(1.02, 1.02, 1)',
              transition: 'all .4s ease-in-out'
            }
          }}
        >
          <Box sx={{ width: 250, m: 'auto' }}>
            <CardMedia sx={{ height: 250, textDecoration: 'none', opacity: 1 }} image={image} component={Link} to={`/browse/gig/${id}`} />
          </Box>
          <Divider />
          <CardContent sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack>
                  <Typography
                    component={Link}
                    to={`/browse/gig/${id}`}
                    color="textPrimary"
                    variant="h5"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      display: 'block',
                      textDecoration: 'none'
                    }}
                  >
                    {name}
                  </Typography>
                  <Typography variant="h6" color="textSecondary">
                    {user}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                  <Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="h5">{formatUSD(price)}</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="flex-start">
                      <Rating precision={0.5} name="size-small" value={productRating} size="small" readOnly />
                      <Typography variant="caption">({productRating?.toFixed(1)})</Typography>
                    </Stack>
                  </Stack>

                  <Button variant="contained" onClick={() => history(`/browse/gig/${id}`)}>
                    Read More
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

ProductCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  user: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  rating: PropTypes.number
};

export default ProductCard;
