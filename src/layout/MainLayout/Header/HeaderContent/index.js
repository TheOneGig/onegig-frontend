// material-ui
import { Box, useMediaQuery } from '@mui/material';

// project import
import Search from './Search';
// import Message from './Message';
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';
import ThemeSwitch from './Switch';
import ToDo from './ToDo';
import Notes from './Notes';
import News from './News'
// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <>
      {!matchesXs && <Search />}
      {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}
      <ThemeSwitch />
      <Notes />
      <ToDo />
      <Notification />
      <News />
      {/* <Message /> */}
      {!matchesXs && <Profile />}
      {matchesXs && <MobileSection />}
    </>
  );
};

export default HeaderContent;
