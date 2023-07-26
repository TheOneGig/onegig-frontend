import React, { useContext, useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { ThemeContext } from '../../../../themes/index';

const ThemeSwitch = () => {
  const { mode, toggleTheme } = useContext(ThemeContext);
  const [switchState, setSwitchState] = useState(mode === 'dark');

  useEffect(() => {
    setSwitchState(mode === 'dark');
  }, [mode]);

  const handleThemeChange = () => {
    toggleTheme();
    setSwitchState((prevState) => !prevState);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <div style={{ width: '60px', color: 'text.primary', bgcolor: 'background.default' }}>
        <div className="toggle-switch">
          <label>
            <input type="checkbox" checked={switchState} onChange={handleThemeChange} />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </Box>
  );
};

export default ThemeSwitch;
