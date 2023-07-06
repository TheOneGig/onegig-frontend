import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../themes/index';
import logo from 'assets/images/brand/OneGig-Icon-White-Gradient.png';
import darkLogo from 'assets/images/brand/OneGig-Icon-Black-Gradient.png';

/// ==============|| LOGO ICON ||============================== //

const LogoIcon = () => {
  const { mode } = useContext(ThemeContext);
  const [logoSrc, setLogoSrc] = useState(mode === 'dark' ? logo : darkLogo);

  useEffect(() => {
    setLogoSrc(mode === 'dark' ? logo : darkLogo);
  }, [mode]);

  return <img src={logoSrc} alt="Mantis" width="100%" />;
};

export default LogoIcon;
