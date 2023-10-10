import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import { showNotification } from '@mantine/notifications';
import { IconPlayerPlayFilled, IconPlayerPauseFilled, IconPlayerStopFilled } from '@tabler/icons-react';
import { PlaySquareOutlined, PauseOutlined, StopOutlined } from '@ant-design/icons';
import { startStopwatch, pauseStopwatch, resetStopwatch, updateTime } from 'store/reducers/stopwatchSlice'; // Import the stopwatchSlice you created

function MyStopwatch() {
  const timerBoxStyle = {
    fontFamily: 'Montserrat', // Use a monospaced font for a digital clock look
    fontSize: '15px', // Adjust the font size as needed
    border: '1px solid #06483c', // Add a border to style the box
    borderRadius: '5px', // Add rounded corners for style
    display: 'flex', // Use flexbox for a horizontal layout
    flexDirection: 'row',
    alignItems: 'center', // Center-align content vertically
    justifyContent: 'space-between' // Add space between elements
  };

  const buttonStyle = {
    marginLeft: '5px' // Add margin at the top to create space
  };

  const contentStyle = {
    marginRight: '5px'
  };

  // Access global state from Redux store
  const { hours, minutes, seconds, isRunning } = useSelector((state) => state.stopwatch);

  // Dispatch actions to update global state
  const dispatch = useDispatch();

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        // Calculate new time values here
        let newSeconds = seconds + 1;
        let newMinutes = minutes;
        let newHours = hours;

        if (newSeconds >= 60) {
          newMinutes += 1;
          newSeconds = 0;
        }

        if (newMinutes >= 60) {
          newHours += 1;
          newMinutes = 0;
        }
        // Dispatch the updateTime action to update the Redux state
        dispatch(updateTime({ hours: newHours, minutes: newMinutes, seconds: newSeconds }));
      }, 1000); // Update every 1 second
    } else {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [dispatch, isRunning, hours, minutes, seconds]);

  const handleStart = () => {
    dispatch(startStopwatch());
    // Show a notification when "Start" button is clicked
    showNotification({
      title: 'Clocked In!',
      message: 'Your clock in has been submitted successfully!',
      color: 'teal', // You can customize the color of the notification
      autoClose: 3000 // Automatically close the notification after 3 seconds
    });
  };

  const handlePause = () => {
    dispatch(pauseStopwatch());
    // Show a notification when "Start" button is clicked
    showNotification({
      title: 'Break!',
      message: 'Your break has been submitted successfully!',
      color: 'teal', // You can customize the color of the notification
      autoClose: 3000 // Automatically close the notification after 3 seconds
    });
  };
  const handleReset = () => {
    dispatch(resetStopwatch());
    showNotification({
      title: 'Clocked out!',
      message: 'Your clock out has been submitted successfully!',
      color: 'teal', // You can customize the color of the notification
      autoClose: 3000 // Automatically close the notification after 3 seconds
    });
  };
  // Local component state for hours, minutes, seconds, and isRunning

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <div style={{ width: '60px', color: 'text.primary', bgcolor: 'background.default' }}></div>
      <div>
        <span>{String(hours).padStart(2, '0')}</span>:<span>{String(minutes).padStart(2, '0')}</span>:
        <span style={contentStyle}>{String(seconds).padStart(2, '0')}</span>
        {isRunning ? (
          <>
            <button className="create-btn blue-btn" style={buttonStyle} onClick={handlePause}>
              <IconPlayerPauseFilled />
            </button>
            <button className="create-btn blue-btn" style={buttonStyle} onClick={handleReset}>
              <IconPlayerStopFilled />
            </button>
          </>
        ) : (
          <button className="create-btn blue-btn" style={buttonStyle} onClick={handleStart}>
            <IconPlayerPlayFilled />
          </button>
        )}
      </div>
    </Box>
  );
}

export default MyStopwatch;
