import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Image } from '@mantine/core';
// project import
import DrawerHeaderStyled from './DrawerHeaderStyled';
import Logo from 'assets/images/brand/OneGig-Icon-Gradient.png';

// ==============================|| DRAWER HEADER ||============================== //

const DrawerHeader = ({ open }) => {
  const theme = useTheme();

  return (
    <DrawerHeaderStyled theme={theme} open={open}>
      <Image height={40} width={40} src={Logo} alt={'adminLogo'} /> <h2>Client Portal</h2>
    </DrawerHeaderStyled>
  );
};

DrawerHeader.propTypes = {
  open: PropTypes.bool
};

export default DrawerHeader;
