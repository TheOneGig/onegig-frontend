// LogoMain.js
import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../themes/index';
import logo from 'assets/images/brand/OneGig-Logo-White-Gradient.png';
import darkLogo from 'assets/images/brand/OneGig-Logo-Black-Gradient.png';
import useAuth from 'hooks/useAuth';

const LogoMain = () => {
  const { user } = useAuth();
  console.log(user);

  const companyName = user?.workspaceId?.companyName;
  const iconUrl = user?.workspaceId?.icon?.fileUrl;
  const { mode } = useContext(ThemeContext);
  const [logoSrc, setLogoSrc] = useState(mode === 'dark' ? logo : darkLogo);

  useEffect(() => {
    setLogoSrc(mode === 'dark' ? logo : darkLogo);
  }, [mode]);

  return ( <>{iconUrl && <img src={iconUrl} alt="Workspace Icon" width="20%" style={{marginRight: 10, borderRadius: "50%"}} />}
  {companyName && <h2>{companyName}</h2>
  }
    </>
  );
};

export default LogoMain;
