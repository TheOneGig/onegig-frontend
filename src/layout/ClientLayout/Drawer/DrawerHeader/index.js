import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Image } from '@mantine/core';
import { useQuery } from 'react-query';
// project import
import DrawerHeaderStyled from './DrawerHeaderStyled';
import Logo from 'assets/images/brand/OneGig-Icon-Gradient.png';
import useClient from 'hooks/useClient';
import { getWorkspaceClient } from 'hooks/workspace';

// ==============================|| DRAWER HEADER ||============================== //

const DrawerHeader = ({ open }) => {
  const theme = useTheme();
  const { clientId } = useClient()

  const { data: workspace, isLoading } = useQuery(['workspace'], () => getWorkspaceClient({ clientId }));

  if (isLoading) {
    return <div>Loading...</div>;
  }
console.log(workspace)
  const companyName = workspace?.companyName;
  const iconUrl = workspace?.icon?.fileUrl;

  return (
    <DrawerHeaderStyled theme={theme} open={open}>
      <Image height={40} width={40} src={iconUrl} alt={'adminLogo'} /> <h2>{ companyName }</h2>
    </DrawerHeaderStyled>
  );
};

DrawerHeader.propTypes = {
  open: PropTypes.bool
};

export default DrawerHeader;
