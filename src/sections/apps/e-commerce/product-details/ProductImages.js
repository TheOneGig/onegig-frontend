import { useState } from 'react';
import PropTypes from 'prop-types';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, CardMedia, Grid, Stack, useMediaQuery } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';

// third-party
import Slider from 'react-slick';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

// assets
import { ZoomInOutlined, ZoomOutOutlined, RedoOutlined, DownOutlined, UpOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';

// ==============================|| PRODUCT DETAILS - IMAGES ||============================== //

const ProductImages = ({ images }) => {
  const theme = useTheme();

  const matchDownLG = useMediaQuery(theme.breakpoints.up('lg'));
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
  const initialImage = images[0]?.fileUrl ? images[0].fileUrl : '';

  const [selected, setSelected] = useState(initialImage);
  const [modal, setModal] = useState(false);

  const lgNo = matchDownLG ? 5 : 4;

  const ArrowUp = (props) => (
    <Box
      {...props}
      color="secondary"
      className="prev"
      sx={{
        cursor: 'pointer',
        '&:hover': { bgcolor: 'transparent' },
        bgcolor: theme.palette.grey[0],
        border: `1px solid ${theme.palette.grey[200]}`,
        borderRadius: 1,
        p: 0.75,
        ...(!matchDownMD && { mb: 1.25 }),
        lineHeight: 0,
        '&:after': { boxShadow: 'none' }
      }}
    >
      {!matchDownMD ? (
        <UpOutlined style={{ fontSize: 'small', color: theme.palette.secondary.light }} />
      ) : (
        <LeftOutlined style={{ fontSize: 'small', color: theme.palette.secondary.light }} />
      )}
    </Box>
  );

  const ArrowDown = (props) => (
    <Box
      {...props}
      color="secondary"
      className="prev"
      sx={{
        cursor: 'pointer',
        '&:hover': { bgcolor: 'transparent' },
        bgcolor: theme.palette.grey[0],
        border: `1px solid ${theme.palette.grey[200]}`,
        borderRadius: 1,
        p: 0.75,
        ...(!matchDownMD && { mt: 1.25 }),
        lineHeight: 0,
        '&:after': { boxShadow: 'none' }
      }}
    >
      {!matchDownMD ? (
        <DownOutlined style={{ fontSize: 'small', color: theme.palette.secondary.light }} />
      ) : (
        <RightOutlined style={{ fontSize: 'small', color: theme.palette.secondary.light }} />
      )}
    </Box>
  );

  const settings = {
    rows: 1,
    vertical: !matchDownMD,
    verticalSwiping: !matchDownMD,
    dots: false,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: '0px',
    slidesToShow: images.length > 3 ? lgNo : images.length,
    prevArrow: <ArrowUp />,
    nextArrow: <ArrowDown />
  };

  return (
    <>
      <Grid container spacing={0.5}>
        <Grid item xs={12} md={10} lg={9}>
          <MainCard
            content={false}
            border={false}
            boxShadow={false}
            shadow="0"
            sx={{
              m: '0 auto',
              height: '100%',
              maxHeight: '400px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              bgcolor: theme.palette.mode === 'dark' ? 'grey.50' : 'secondary.lighter',
              '& .react-transform-wrapper': { cursor: 'crosshair', height: '100%', maxHeight: '400px', width: '100%' },
              '& .react-transform-component': { height: '100%', maxHeight: '400px', width: '100%' }
            }}
          >
            <TransformWrapper initialScale={1}>
              {({ zoomIn, zoomOut, resetTransform }) => (
                <>
                  <TransformComponent>
                    <CardMedia
                      onClick={() => setModal(!modal)}
                      component="img"
                      image={selected}
                      title="Scroll Zoom"
                      sx={{ borderRadius: `4px`, position: 'relative' }}
                    />
                  </TransformComponent>
                  <Stack direction="row" className="tools" sx={{ position: 'absolute', bottom: 10, right: 10, zIndex: 1 }}>
                    <IconButton color="secondary" onClick={() => zoomIn()}>
                      <ZoomInOutlined style={{ fontSize: '1.15rem' }} />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => zoomOut()}>
                      <ZoomOutOutlined style={{ fontSize: '1.15rem' }} />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => resetTransform()}>
                      <RedoOutlined style={{ fontSize: '1.15rem' }} />
                    </IconButton>
                  </Stack>
                </>
              )}
            </TransformWrapper>
          </MainCard>
        </Grid>
        <Grid item xs={12} md={2} lg={3} sx={{ height: '100%' }}>
          <Box
            sx={{
              '& .slick-slider': {
                display: 'flex',
                alignItems: 'center',
                mt: 2
              },
              ...(!matchDownMD && {
                display: 'flex',
                height: '100%',
                '& .slick-slider': {
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mt: '10px',
                  width: 100
                },
                '& .slick-arrow': {
                  '&:hover': { bgcolor: theme.palette.grey.A200 },
                  position: 'initial',
                  color: theme.palette.grey[500],
                  bgcolor: theme.palette.grey.A200,
                  p: 0,
                  transform: 'rotate(90deg)',
                  borderRadius: '50%',
                  height: 17,
                  width: 19
                }
              })
            }}
          >
            <Slider {...settings}>
              {images.map((item, index) => (
                <Box key={index} onClick={() => setSelected(item.fileUrl)} sx={{ p: 1 }}>
                  <Avatar
                    size={matchDownLG ? 'xl' : 'md'}
                    src={item.fileUrl}
                    variant="rounded"
                    sx={{
                      m: '0 auto',
                      cursor: 'pointer',
                      bgcolor: theme.palette.grey[0],
                      border: `1px solid ${theme.palette.grey[200]}`
                    }}
                  />
                </Box>
              ))}
            </Slider>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

ProductImages.propTypes = {
  images: PropTypes.array
};

export default ProductImages;
