import React, { useContext, useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { ThemeContext } from '../../../../themes/index';
import { useTheme } from '@mui/material/styles';

const ThemeSwitch = () => {
  const { mode, toggleTheme } = useContext(ThemeContext);
  const theme = useTheme()
  const [switchState, setSwitchState] = useState(mode === 'dark');

  useEffect(() => {
    setSwitchState(mode === 'dark');
  }, [mode]);

  const handleThemeChange = () => {
    toggleTheme();
    setSwitchState((prevState) => !prevState);
  };

  const sliderStyle = {
    backgroundColor: switchState ? theme.palette.primary.main : '',
    // Aquí puedes añadir más estilos
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <div style={{ width: '60px', color: 'text.primary', bgcolor: 'background.default' }}>
        <div className="toggle-switch">
          <label>
            <input type="checkbox" checked={switchState} onChange={handleThemeChange} />
            <span style={sliderStyle} className="slider"></span>
          </label>
        </div>
      </div>
    </Box>
  );
};

export default ThemeSwitch;
