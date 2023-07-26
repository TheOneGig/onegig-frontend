import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import { drawerWidth } from 'config';

const openedMixin = (theme) => ({
  width: drawerWidth,
  borderRight: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.default,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden',
  boxShadow: theme.palette.mode === 'dark' ? theme.customShadows.z1 : 'none'
});

const MiniDrawerStyled = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...openedMixin(theme),
  '& .MuiDrawer-paper': openedMixin(theme)
}));

export default MiniDrawerStyled;
