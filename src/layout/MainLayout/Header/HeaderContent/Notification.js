import { Fragment, useRef, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { markAllAsRead } from 'hooks/notifications'; // Asegúrate de importar tu función markAllAsRead
import Dot from 'components/@extended/Dot';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Badge,
  Box,
  ClickAwayListener,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Popper,
  Tooltip,
  Typography,
  useMediaQuery,
  ListItemIcon
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import Transitions from 'components/@extended/Transitions';

// assets
import { BellOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { getNotifications } from 'hooks/notifications';
import useAuth from 'hooks/useAuth';
import dayjs from 'dayjs';

// sx styles
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

const actionSX = {
  mt: '6px',
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',

  transform: 'none'
};

// ==============================|| HEADER CONTENT - NOTIFICATION ||============================== //

const Notification = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const userId = user.id;
  const markAllNotificationsAsReadMutation = useMutation(markAllAsRead, {
    onSuccess: () => {
      queryClient.refetchQueries(['notifications']);
    }
  });

  const { data: notifications, isLoading: loadingNotifications } = useQuery(['notifications'], () => getNotifications({ userId }));

  const anchorRef = useRef(null);
  //const [read, setRead] = useState(2);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const iconBackColorOpen = theme.palette.mode === 'dark' ? 'grey.200' : 'grey.300';
  const iconBackColor = theme.palette.mode === 'dark' ? 'background.default' : 'grey.100';

  if (loadingNotifications) {
    return <></>;
  }

  const unread = notifications.filter((notification) => !notification.read);

  const handleMarkAsRead = async () => {
    try {
      await markAllNotificationsAsReadMutation.mutateAsync({ userId });
    } catch (error) {
      console.error('Error marking notifications as read:', error.response?.data?.message || error.message);
      // Aquí puedes mostrar un mensaje de error al usuario si lo deseas.
    }
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <IconButton
        color="secondary"
        variant="light"
        sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Badge badgeContent={unread.length} color="primary">
          <BellOutlined />
        </Badge>
      </IconButton>
      <Popper
        placement={matchesXs ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [matchesXs ? -5 : 0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                width: '100%',
                minWidth: 285,
                maxWidth: 420,
                [theme.breakpoints.down('md')]: {
                  maxWidth: 285
                }
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  title="Notifications"
                  elevation={0}
                  border={false}
                  content={false}
                  secondary={
                    <>
                      {unread.length > 0 && (
                        <Tooltip title="Mark as all read">
                          <IconButton size="small" onClick={handleMarkAsRead}>
                            <CheckCircleOutlined style={{ fontSize: '1.15rem' }} />
                          </IconButton>
                        </Tooltip>
                      )}
                    </>
                  }
                >
                  <List
                    component="nav"
                    sx={{
                      p: 0,
                      '& .MuiListItemButton-root': {
                        py: 0.5,
                        '&.Mui-selected': { bgcolor: 'grey.50', color: 'text.primary' },
                        '& .MuiAvatar-root': avatarSX,
                        '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                      }
                    }}
                  >
                    {unread?.map((notification) => {
                      return (
                        <Fragment key={notification.notificationId}>
                          <ListItemButton>
                            {/* selected={read > 0} */}
                            <ListItemIcon>
                              <Dot color="success" size={12} />
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="h6"> {notification.message}</Typography>} />
                            <ListItemSecondaryAction>
                              <ListItemIcon ListItemIcon>
                                <Typography variant="caption" noWrap>
                                  {dayjs(notification.createdAt).format('MM/DD')}
                                </Typography>
                              </ListItemIcon>
                            </ListItemSecondaryAction>
                          </ListItemButton>
                          <Divider />
                        </Fragment>
                      );
                    })}
                  </List>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Notification;
