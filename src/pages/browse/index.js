import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';

// project import
import ProductFilterDrawer from 'sections/apps/e-commerce/products/ProductFilterDrawer';
import SkeletonProductPlaceholder from 'components/cards/skeleton/ProductPlaceholder';
import ProductsHeader from 'sections/apps/e-commerce/products/ProductsHeader';
import ProductCard from './ProductCard';
import ProductEmpty from 'sections/apps/e-commerce/products/ProductEmpty';
import useConfig from 'hooks/useConfig';
import { useDispatch } from 'store';
import { filterProducts } from 'store/reducers/product';
import { getAllGigs } from 'hooks/gigs';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' && prop !== 'container' })(({ theme, open, container }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.shorter
  }),
  marginLeft: -320,
  ...(container && {
    [theme.breakpoints.only('lg')]: {
      marginLeft: !open ? -240 : 0
    }
  }),
  [theme.breakpoints.down('lg')]: {
    paddingLeft: 0,
    marginLeft: 0
  },
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.shorter
    }),
    marginLeft: 0
  })
}));

const ProductsPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { data: gigs, isLoading } = useQuery(['gigs'], () => getAllGigs());

  const { container } = useConfig();

  const [openFilterDrawer, setOpenFilterDrawer] = useState(true);
  const handleDrawerOpen = () => {
    setOpenFilterDrawer((prevState) => !prevState);
  };

  // filter
  const initialState = {
    search: '',
    sort: 'low',
    gender: [],
    categories: ['all'],
    colors: [],
    price: '',
    rating: 0
  };
  const [filter, setFilter] = useState(initialState);

  const filterData = async () => {
    await dispatch(filterProducts(filter));
  };

  useEffect(() => {
    filterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  let productResult = <></>;
  if (gigs && gigs.length > 0) {
    productResult = gigs.map((gig) => (
      <Grid key={gig.gigId} item xs={12} sm={6} md={4}>
        <ProductCard
          id={gig.gigId}
          image={gig.files?.length > 0 && gig.files[0].fileUrl}
          name={gig.name}
          user={gig.user?.nickname ? gig.user.nickname : gig.user.email}
          description={gig.description}
          price={gig.price}
          salePrice={gig.salePrice}
          rating={gig.rating}
          color={gig.colors ? gig.colors[0] : undefined}
          open={openFilterDrawer}
        />
      </Grid>
    ));
  } else {
    productResult = (
      <Grid item xs={12} sx={{ mt: 3 }}>
        <ProductEmpty handelFilter={() => setFilter(initialState)} />
      </Grid>
    );
  }

  return (
    <Box sx={{ display: 'flex', marginTop: '85px', padding: '15px' }}>
      <ProductFilterDrawer
        filter={filter}
        setFilter={setFilter}
        openFilterDrawer={openFilterDrawer}
        handleDrawerOpen={handleDrawerOpen}
        initialState={initialState}
      />
      <Main theme={theme} open={openFilterDrawer} container={container}>
        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <ProductsHeader filter={filter} handleDrawerOpen={handleDrawerOpen} setFilter={setFilter} />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {isLoading
                ? [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <Grid key={item} item xs={12} sm={6} md={4} lg={4}>
                      <SkeletonProductPlaceholder />
                    </Grid>
                  ))
                : productResult}
            </Grid>
          </Grid>
        </Grid>
      </Main>
    </Box>
  );
};

export default ProductsPage;
