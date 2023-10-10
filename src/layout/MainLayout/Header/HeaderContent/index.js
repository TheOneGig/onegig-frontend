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
import MyStopwatch from 'pages/times/TimeTracker';

// ===|| Time Tracker Inline Style ||=== //
const customStyle = {
  fontFamily: 'Montserrat', // Use a monospaced font for a digital clock look
  fontSize: '15px', // Adjust the font size as needed
  border: '1px solid #06483c', // Add a border to style the box
  borderRadius: '5px', // Add rounded corners for style
  display: 'flex', // Use flexbox for a horizontal layout
  flexDirection: 'row',
  alignItems: 'center', // Center-align content vertically
  justifyContent: 'space-between' // Add space between elements
};

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
      <MyStopwatch style={customStyle} />
      {/* <Message /> */}
      {!matchesXs && <Profile />}
      {matchesXs && <MobileSection />}
    </>
  );
};

export default HeaderContent;
