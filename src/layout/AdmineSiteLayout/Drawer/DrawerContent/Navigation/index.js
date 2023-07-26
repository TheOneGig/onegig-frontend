//import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

// material-ui
import { Box, Typography } from '@mui/material';

// project import
import NavGroup from './NavGroup';
import menuItem from 'menu-adminsite';
//import menuAdmin from 'menu-admin';
// import { getUser } from 'hooks/users';
// import useAuth from 'hooks/useAuth';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
  // const { user } = useAuth();
  // const userId = user.id;
  // const { data: userInfo, isLoading } = useQuery(['user'], () => getUser({ userId }));
  const menu = useSelector((state) => state.menu);
  const { drawerOpen } = menu;
  // if (isLoading) {
  //   return <div></div>;
  // }
  const menuList = menuItem;
  const navGroups = menuList.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return <Box sx={{ pt: drawerOpen ? 2 : 0, '& > ul:first-of-type': { mt: 0 } }}>{navGroups}</Box>;
};

export default Navigation;
