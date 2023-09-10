import PropTypes from 'prop-types';
import { useMemo, createContext, useEffect, useState } from 'react';

// material-ui
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// project imports
import Palette from './palette';
import Typography from './typography';
import CustomShadows from './shadows';
import componentsOverride from './overrides';

// create context
export const ThemeContext = createContext();

// ==============================|| DEFAULT THEME - MAIN  ||============================== //

export default function ThemeCustomization({ children, mode, toggleTheme, setMode }) {
  const fontFamily = `'Roboto', sans-serif`;
  const themeDirection = 'ltr';
  const presetColor = 'theme3';

  const [themeColors, setThemeColors] = useState({
    primary: localStorage.getItem('primaryColor') || '#0eba9b',
    secondary: localStorage.getItem('secondaryColor') || '#1dbeea'
  });
  
  const theme = useMemo(() => Palette(mode, presetColor, themeColors), [mode, presetColor, themeColors]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const themeTypography = useMemo(() => Typography(fontFamily), [fontFamily]);
  const themeCustomShadows = useMemo(() => CustomShadows(theme), [theme]);

  const themeOptions = useMemo(
    () => ({
      breakpoints: {
        values: {
          xs: 0,
          sm: 768,
          md: 1024,
          lg: 1266,
          xl: 1440
        }
      },
      direction: themeDirection,
      mixins: {
        toolbar: {
          minHeight: 60,
          paddingTop: 8,
          paddingBottom: 8
        }
      },
      palette: theme.palette,
      customShadows: themeCustomShadows,
      typography: themeTypography
    }),
    [themeDirection, theme, themeTypography, themeCustomShadows]
  );

  const themes = createTheme(themeOptions);
  themes.components = componentsOverride(themes);

  useEffect(() => {
    const handleStorageChange = () => {
      setMode(localStorage.getItem('mode') === 'dark' ? 'dark' : 'light');
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [setMode]);

  useEffect(() => {
    // Obtener colores desde localStorage al montar el componente
    const localPrimary = localStorage.getItem('primaryColor');
    const localSecondary = localStorage.getItem('primaryColor');
    console.log("themeColors en useEffect:", themeColors);
    if (localPrimary && localSecondary) {
      setThemeColors({
        primary: localPrimary,
        secondary: localSecondary
      });
    }
  }
  , []);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        <ThemeContext.Provider value={{ mode, toggleTheme }}>{children}</ThemeContext.Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

ThemeCustomization.propTypes = {
  children: PropTypes.node,
  mode: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  setMode: PropTypes.func.isRequired
};
