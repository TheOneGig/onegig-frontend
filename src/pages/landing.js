//import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// third-party
//import { presetDarkPalettes, presetPalettes } from '@ant-design/colors';

// project import

// import useConfig from 'hooks/useConfig';
import Hero from 'sections/landing/Header';

// assets
// import { CheckOutlined } from '@ant-design/icons';
// const dashImage = require.context('assets/images/landing', true);

// ==============================|| LANDING PAGE ||============================== //

const Landing = () => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          bgcolor: theme.palette.mode === 'dark' ? 'grey.0' : 'grey.800',
          overflow: 'hidden',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center ',
          justifyContent: 'center',

          '&>*': {
            position: 'relative',
            zIndex: 5
          },
          '&:before': {
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            zIndex: 2,
            background: 'linear-gradient(329.36deg, #000000 14.79%, rgba(67, 67, 67, 0.28) 64.86%);'
          }
        }}
      >
        <Hero />
      </Box>
    </>
  );
};

export default Landing;

// old landing page

// hooks
//

//  const { mode, presetColor, onChangePresetColor } = useConfig();

//  const [visible, setVisible] = useState(false);

//  useEffect(() => {
//    const listenToScroll = () => {
//      let heightToHideFrom = 250;
//      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

//      if (winScroll > heightToHideFrom) {
//        setVisible(true);
//      } else {
//        visible && setVisible(false);
//      }
//    };

//    window.addEventListener('scroll', listenToScroll);
//    return () => window.removeEventListener('scroll', listenToScroll);
//  }, [visible]);

//  const colors = mode === 'dark' ? presetDarkPalettes : presetPalettes;
//  const { blue } = colors;
//  const colorOptions = [
//    {
//      id: 'theme3',
//      primary: mode === 'dark' ? '#0eba9b' : '#068e44'
//    },
//    {
//      id: 'default',
//      primary: blue[5]
//    },
//    {
//      id: 'theme8',
//      primary: mode === 'dark' ? '#058478' : '#009688'
//    }
//  ];

//  const handlePresetColorChange = (event) => {
//    onChangePresetColor(event.target.value);
//  };

{
  /* <FeatureBlock />
      <DemoBlock />
      <CallToAction />
      <NumberBlock />
      <BrowserBlock />
      <ElementBlock />
      <PartnerBlock />
      <TestimonialBlock />
      <Slide direction="left" in={visible} mountOnEnter unmountOnExit>
        <MainCard
          sx={{
            width: { xs: '100%', sm: 'auto' },
            position: 'fixed',
            zIndex: 9,
            right: { xs: 0, sm: 16 },
            bottom: { xs: 0, sm: '25%' },
            borderRadius: { xs: 0, sm: 1 }
          }}
          content={false}
          shadow={theme.customShadows.z1}
          boxShadow
          border={false}
        >
          <RadioGroup
            sx={{ alignItems: { xs: 'center', sm: 'flex-end' }, p: 1.25 }}
            aria-label="payment-card"
            name="payment-card"
            value={presetColor}
            onChange={handlePresetColorChange}
          >
            <Stack direction={{ xs: 'row', sm: 'column' }} spacing={1} alignItems="center">
              {colorOptions.map((color, index) => (
                <FormControlLabel
                  key={index}
                  control={<Radio value={color.id} sx={{ opacity: 0, position: 'absolute', zIndex: 9 }} />}
                  sx={{
                    mr: 0,
                    ml: 0,
                    zIndex: 1,
                    '&:hover': {
                      position: 'relative',
                      '& .MuiIconButton-root:after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        background: '#fff',
                        opacity: 0.3,
                        boxShadow: `0 0 6px 6px ${alpha(color.primary, 0.9)}`
                      }
                    }
                  }}
                  label={
                    <IconButton
                      shape="rounded"
                      variant="contained"
                      sx={{
                        bgcolor: color.primary,
                        width: presetColor === color.id ? 28 : 20,
                        height: presetColor === color.id ? 28 : 20
                      }}
                    >
                      {presetColor === color.id && <CheckOutlined />}
                    </IconButton>
                  }
                />
              ))}
            </Stack>
          </RadioGroup>
        </MainCard>
      </Slide> */
}
