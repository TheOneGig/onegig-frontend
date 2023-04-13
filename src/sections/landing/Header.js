import { Link as RouterLink } from 'react-router-dom';
import logo from '../../assets/images/brand/OneGig-Logo-White-Gradient.png';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Container, Grid, Typography, CardMedia } from '@mui/material';

// third party
import { motion } from 'framer-motion';

// assets
// import { EyeOutlined } from '@ant-design/icons';
// import headertechimg from 'assets/images/landing/img-headertech.svg';
// import headerbg from 'assets/images/landing/bg-mokeup.svg';
// import headeravtar from 'assets/images/landing/img-headeravtar.png';
// import headerwidget1 from 'assets/images/landing/img-headerwidget1.png';
// import headerwidget2 from 'assets/images/landing/img-headerwidget2.png';
// import headerwidget3 from 'assets/images/landing/img-headerwidget3.png';
import AnimateButton from 'components/@extended/AnimateButton';

// ==============================|| LANDING - HEADER PAGE ||============================== //

const HeaderPage = () => {
  const theme = useTheme();

  return (
    <Container sx={{ height: '100vh', display: 'flex', alignItems: 'center'}}> 
      <Grid container alignItems="center" flexDirection="column" justifyContent="center" spacing={1} sx={{ pt: { md: 0, xs: 8 }, pb: { md: 0, xs: 5 } }}>
        <CardMedia
            component="img"
            image={logo}
              
            sx={{
                width: { md: '78%', lg: '70%', xl: '60%' },
                right: { md: '-14%', lg: '-4%', xl: '-2%' },
                top: { md: '16%', lg: '12%', xl: '20%' },
            }}
        />
        <Grid item xs={12} lg={6} md={6}>
          <Grid container spacing={2} sx={{textAlign: 'center',  [theme.breakpoints.down('md')]: { pr: 0, textAlign: 'center' } }}>
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30
                }}
              >
                <Typography
                  variant="h1"
                  color="white"
                  sx={{
                    fontSize: { xs: '1.825rem', sm: '2rem', md: '2.5rem' },
                    fontWeight: 700,
                    lineHeight: { xs: 1.3, sm: 1.3, md: 1.3 }
                  }}
                >
                  <span>The </span>
                  <Box component="span" sx={{ color: theme.palette.primary.main }}>
                   <span> ONE </span>
                   </Box>
                   <span> app for all your  </span>
                  <Box component="span" sx={{ color: theme.palette.primary.main }}>
                    <span>Freelancing GIGs </span>
                  </Box>
                  <span>Project</span>
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                  delay: 0.2
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  color="white"
                  sx={{
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    fontWeight: 400,
                    lineHeight: { xs: 1.4, md: 1.4 }
                  }}
                >
                  The all-in-one platform that brings clients, projects, and tools together in one place.
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} sx={{ my: 3.25 }}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                  delay: 0.4
                }}
              >
                <Grid container spacing={1} sx={{ justifyContent: { xs: 'center', md: 'center' } }}>
                  <Grid item>
                    <AnimateButton>
                      <Button component={RouterLink} 
                        to="/login"
                        size="large" 
                        color="primary" 
                        variant="outlined"
                        
                        sx={{
                          '&:hover': {
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            transition: '0.3s',
                          }
                        }}
                      >
                        Join Now!
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={7} md={6} sx={{ display: { xs: 'none', md: 'flex' } }}>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HeaderPage;



// buttons
 {/* <Grid item>
                    <AnimateButton>
                      <Button
                        component={Link}
                        href="/login"
                        target="_blank"
                        size="large"
                        color="primary"
                        variant="contained"
                        startIcon={<EyeOutlined style={{ fontSize: '1.15rem' }} />}
                      >
                        Live Preview
                      </Button>
                    </AnimateButton>
                  </Grid> */
  }


// icons
  {/* <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                  delay: 0.6
                }}
              >
                <img src={headertechimg} alt="Mantis" />
              </motion.div>
            </Grid> */
  }

 {/* <Box sx={{ position: 'relative', mt: 8.75 }}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                type: 'spring',
                                stiffness: 150,
                                damping: 30,
                                delay: 0
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={headerbg}
                                sx={{ position: 'absolute', width: { xs: '100%', lg: '115%' }, left: '-8%', top: '-28%', zIndex: 1 }}
                            />
                        </motion.div>
                        <Grid container spacing={2} sx={{ position: 'relative', zIndex: 2 }}>
                            <Grid item xs={12}>
                                <Grid container spacing={2} sx={{ alignItems: 'flex-end' }}>
                                    <Grid item xs={4} sx={{ textAlign: 'center' }}>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 150,
                                                damping: 30,
                                                delay: 0.2
                                            }}
                                        >
                                            <CardMedia component="img" image={headeravtar} sx={{ width: 'auto', m: '0 auto' }} />
                                        </motion.div>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 150,
                                                damping: 30,
                                                delay: 0.4
                                            }}
                                        >
                                            <CardMedia component="img" image={headerwidget1} />
                                        </motion.div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={8}>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 150,
                                                damping: 30,
                                                delay: 0.6
                                            }}
                                        >
                                            <CardMedia component="img" image={headerwidget3} />
                                        </motion.div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 150,
                                                damping: 30,
                                                delay: 0.8
                                            }}
                                        >
                                            <CardMedia component="img" image={headerwidget2} />
                                        </motion.div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box> */}