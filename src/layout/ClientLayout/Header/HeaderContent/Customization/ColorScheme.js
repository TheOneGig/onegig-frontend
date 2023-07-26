// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import { CardMedia, FormControlLabel, Grid, Radio, RadioGroup, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import useConfig from 'hooks/useConfig';

// third-party
import { presetDarkPalettes, presetPalettes } from '@ant-design/colors';

// assets
import colorLayout from 'assets/images/customization/theme-color.svg';

// ==============================|| CUSTOMIZATION - COLOR SCHEME ||============================== //

const ColorScheme = () => {
  const theme = useTheme();

  const { mode, presetColor, onChangePresetColor } = useConfig();

  const colors = mode === 'dark' ? presetDarkPalettes : presetPalettes;
  const { blue } = colors;
  const colorOptions = [
    {
      id: 'default',
      primary: blue[5],
      lighter: blue[0],
      label: 'Default',
      shadow: `0 0 0 2px ${alpha(blue[5], 0.2)}`
    },
    {
      id: 'theme3',
      primary: mode === 'dark' ? '#0eba9b' : '#068e44',
      lighter: mode === 'dark' ? '#1a231f' : '#E6F3EC',
      label: 'Theme 3',
      shadow: `0 0 0 2px ${alpha(mode === 'dark' ? '#0eba9b' : '#068e44', 0.2)}`
    }
  ];

  const handlePresetColorChange = (event) => {
    onChangePresetColor(event.target.value);
  };

  return (
    <RadioGroup row aria-label="payment-card" name="payment-card" value={presetColor} onChange={handlePresetColorChange}>
      <Grid container spacing={2} sx={{ ml: 0 }}>
        {colorOptions.map((color, index) => (
          <Grid item key={index}>
            <FormControlLabel
              control={<Radio value={color.id} sx={{ display: 'none' }} />}
              sx={{ display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
              label={
                <MainCard
                  content={false}
                  sx={{ bgcolor: presetColor === color.id ? color.lighter : 'secondary.lighter', p: 1 }}
                  border={false}
                  boxShadow
                  shadow={presetColor === color.id ? color.shadow : theme.customShadows.z1}
                >
                  <Stack spacing={1.5} alignItems="center">
                    <CardMedia
                      component="img"
                      src={colorLayout}
                      alt="Vertical"
                      sx={{
                        border: `1px solid ${color.primary}`,
                        borderRadius: 1,
                        bgcolor: color.primary,
                        width: 40,
                        height: 40
                      }}
                    />
                    <Typography variant="caption">{color.label}</Typography>
                  </Stack>
                </MainCard>
              }
            />
          </Grid>
        ))}
      </Grid>
    </RadioGroup>
  );
};

export default ColorScheme;
