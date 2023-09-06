import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../themes/index';
import useAuth from 'hooks/useAuth';
import logo from 'assets/images/brand/OneGig-Icon-White-Gradient.png';
import darkLogo from 'assets/images/brand/OneGig-Icon-Black-Gradient.png';

/// ==============|| LOGO ICON ||============================== //

const LogoIcon = () => {
  const { mode } = useContext(ThemeContext);
  const [logoSrc, setLogoSrc] = useState(mode === 'dark' ? logo : darkLogo);

  const { user } = useAuth();
  console.log(user);

  const companyName = user?.workspaceId?.companyName;
  const iconUrl = user?.workspaceId?.icon?.fileUrl;

  useEffect(() => {
    setLogoSrc(mode === 'dark' ? logo : darkLogo);
  }, [mode]);

  return (<img src={iconUrl} alt="Mantis" width="100%" style={{marginLeft: 20, borderRadius: "50%"}} />);
};

export default LogoIcon;
