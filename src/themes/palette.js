// material-ui
import { alpha, createTheme } from '@mui/material/styles';

// third-party
import { presetDarkPalettes } from '@ant-design/colors';

// project import
import ThemeOption from './theme';

// ==============================|| DEFAULT THEME - PALETTE  ||============================== //

const Palette = (mode, presetColor, themeColors) => {
  const colors = presetDarkPalettes;

  // Define colors for dark mode
  let greyPrimaryDark = [
    '#000000',
    '#141414',
    '#1e1e1e',
    '#595959',
    '#8c8c8c',
    '#bfbfbf',
    '#d9d9d9',
    '#f0f0f0',
    '#f5f5f5',
    '#fafafa',
    '#ffffff'
  ];
  let greyAscentDark = ['#fafafa', '#bfbfbf', '#434343', '#1f1f1f'];
  let greyConstantDark = ['#121212', '#d3d8db'];

  // Define colors for light mode
  let greyPrimaryLight = [
    '#ffffff',
    '#fafafa',
    '#f5f5f5',
    '#f0f0f0',
    '#d9d9d9',
    '#bfbfbf',
    '#8c8c8c',
    '#595959',
    '#262626',
    '#141414',
    '#000000'
  ];
  let greyAscentLight = ['#121212', '#434343', '#bfbfbf', '#fafafa'];
  let greyConstantLight = ['#f0f0f0', '#1a2332'];

  // Use colors based on mode
  let greyPrimary, greyAscent, greyConstant;
  if (mode === 'dark') {
    greyPrimary = greyPrimaryDark;
    greyAscent = greyAscentDark;
    greyConstant = greyConstantDark;
  } else {
    greyPrimary = greyPrimaryLight;
    greyAscent = greyAscentLight;
    greyConstant = greyConstantLight;
  }

  colors.grey = [...greyPrimary, ...greyAscent, ...greyConstant];

  const paletteColor = ThemeOption(colors, presetColor, mode, themeColors);

  return createTheme({
    palette: {
      mode,
      common: {
        black: '#111',
        white: '#fff'
      },
      ...paletteColor,
      text: {
        primary: mode === 'dark' ? alpha(paletteColor.grey[900], 0.87) : paletteColor.grey[700],
        secondary: mode === 'dark' ? alpha(paletteColor.grey[900], 0.45) : paletteColor.grey[500],
        disabled: mode === 'dark' ? alpha(paletteColor.grey[900], 0.1) : paletteColor.grey[400]
      },
      action: {
        disabled: paletteColor.grey[300]
      },
      divider: mode === 'dark' ? alpha(paletteColor.grey[900], 0.05) : paletteColor.grey[200],
      background: {
        paper: mode === 'dark' ? paletteColor.grey[100] : paletteColor.grey[0],
        default: paletteColor.grey.A50
      }
    }
  });
};

export default Palette;
