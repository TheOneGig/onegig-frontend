import Navigation from './Navigation';
import SimpleBar from 'components/third-party/SimpleBar';
import { useTheme } from '@mui/material';
// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => {
  const theme = useTheme();
  return (
    <SimpleBar
      sx={{
        '& .simplebar-content': {
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: theme.palette.background.default
        }
      }}
    >
      <Navigation />
    </SimpleBar>
  );
};

export default DrawerContent;
