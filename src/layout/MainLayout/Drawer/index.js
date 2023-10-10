import PropTypes from 'prop-types';
import { useMemo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Drawer, useMediaQuery } from '@mui/material';

// project import
import DrawerHeader from './DrawerHeader';
import DrawerContent from './DrawerContent';
import DrawerContent2 from './DrawerContent2';
import MiniDrawerStyled from './MiniDrawerStyled';
import MiniDrawerStyled2 from './MiniDrawerStyled2';
import { drawerWidth } from 'config';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSecondDrawer, setActiveGroup } from 'store/reducers/menu';


// ==============================|| MAIN LAYOUT - DRAWER ||============================== //

const MainDrawer = ({ open, handleDrawerToggle, window }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));


  const dispatch = useDispatch();
  const { secondDrawerOpen, activeGroup } = useSelector((state) => state.menu);

  // responsive drawer container
  const container = window !== undefined ? () => window().document.body : undefined;

  // header content
  const drawerContent = useMemo(() => <DrawerContent activeGroup={activeGroup} />, [activeGroup]);
  const drawerContent2 = useMemo(() => <DrawerContent2 />, []);
  const drawerHeader = useMemo(() => <DrawerHeader open={open} />, [open]);

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, zIndex: 1200 }} aria-label="mailbox folders">
      {!matchDownMD ? (
        <>
        <MiniDrawerStyled style={{borderRight: '1px solid black'}}
         variant="permanent" 
         open={secondDrawerOpen}
         onMouseEnter={() => dispatch(toggleSecondDrawer(true))}
        onMouseLeave={() => dispatch(toggleSecondDrawer(false))}
         >
          {drawerHeader}
          {drawerContent}
        </MiniDrawerStyled>
        <MiniDrawerStyled2 variant="permanent" open={false}>
        {drawerHeader}
        {drawerContent2}
      </MiniDrawerStyled2>
      </>
      ) : (
        <Drawer
          container={container}
          variant="temporary"
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: `1px solid ${theme.palette.divider}`,
              backgroundImage: 'none',
              boxShadow: 'inherit'
            }
          }}
        >
          {drawerHeader}
          {drawerContent}
        </Drawer>
      )}
    </Box>
  );
};

MainDrawer.propTypes = {
  open: PropTypes.bool,
  window: PropTypes.object,
  handleDrawerToggle: PropTypes.func
};

export default MainDrawer;
