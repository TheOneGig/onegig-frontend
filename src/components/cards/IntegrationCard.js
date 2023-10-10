import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, CardContent, CardMedia, Divider, Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import SkeletonProductPlaceholder from 'components/cards/skeleton/ProductPlaceholder';

// assets
import { CheckCircleFilled } from '@ant-design/icons';


// ==============================|| PRODUCT CARD ||============================== //

const ProductCard = ({ id, name, image, description,  }) => {
  const theme = useTheme();
  const [isInstalled, setIsInstalled] = useState(false);

  const prodProfile = image

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
            <CardMedia
              sx={{ height: 250,  textDecoration: 'none', opacity: isInstalled ? 0.25 : 1}}
              image={prodProfile}
              component={Link}
              to={`/apps/e-commerce/product-details/${id}`}
            />
          </Box>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: '100%', position: 'absolute', top: 0, pt: 1.75, pl: 2, pr: 1 }}
          >
            <IconButton color="secondary" sx={{ ml: 'auto', '&:hover': { background: 'transparent' } }}>
              {isInstalled ? (
                <CheckCircleFilled style={{ fontSize: '1.15rem', color: theme.palette.info.main }} />
              ) : (
                null
              )}
            </IconButton>
          </Stack>
          <Divider />
          <CardContent sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack>
                  <Typography
                    component={Link}
                    to={`/apps/e-commerce/product-details/${id}`}
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
                    {description}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="center" alignItems="center">
                  <Button disabled={isInstalled} sx={{ width: '60%'}} onClick={() => setIsInstalled(true)} variant="contained">
                    Connect
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
  id: PropTypes.number,
  name: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string,
};

export default ProductCard;
