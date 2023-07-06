// LogoMain.js
import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../themes/index';
import logo from 'assets/images/brand/OneGig-Logo-White-Gradient.png';
import darkLogo from 'assets/images/brand/OneGig-Logo-Black-Gradient.png';

const LogoMain = () => {
  const { mode } = useContext(ThemeContext);
  const [logoSrc, setLogoSrc] = useState(mode === 'dark' ? logo : darkLogo);

  useEffect(() => {
    setLogoSrc(mode === 'dark' ? logo : darkLogo);
  }, [mode]);

  return <img src={logoSrc} alt="OneGig" width="200px" />;
};

export default LogoMain;
