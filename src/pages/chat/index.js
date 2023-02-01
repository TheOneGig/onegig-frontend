import { useEffect, useRef, useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Box, ClickAwayListener, Grid, Popper, Stack, TextField, Typography } from '@mui/material';

// third party
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';

// project import
import ChatHistory from 'sections/apps/chat/ChatHistory';
import UserAvatar from 'sections/apps/chat/UserAvatar';
import { dispatch, useSelector } from 'store';
import { getUser, getUserChats, insertChat } from 'store/reducers/chat';
import { openDrawer } from 'store/reducers/menu';
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import SimpleBar from 'components/third-party/SimpleBar';
import { openSnackbar } from 'store/reducers/snackbar';

// assets
import { PaperClipOutlined, PictureOutlined, SendOutlined, SmileOutlined, SoundOutlined } from '@ant-design/icons';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(() => ({ flexGrow: 1 }));
const Chat = () => {
  const theme = useTheme();

  const [user, setUser] = useState({});

  const [data, setData] = useState([]);
  const chatState = useSelector((state) => state.chat);

  const [anchorElEmoji, setAnchorElEmoji] = useState();

  const handleOnEmojiButtonClick = (event) => {
    setAnchorElEmoji(anchorElEmoji ? null : event?.currentTarget);
  };

  // handle new message form
  const [message, setMessage] = useState('');
  const textInput = useRef(null);

  const handleOnSend = () => {
    if (message.trim() === '') {
      dispatch(
        openSnackbar({
          open: true,
          message: 'Message required',
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: false
        })
      );
    } else {
      const d = new Date();
      const newMessage = {
        from: 'User1',
        to: user.name,
        text: message,
        time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setData((prevState) => [...prevState, newMessage]);
      dispatch(insertChat(newMessage));
    }
    setMessage('');
  };

  const handleEnter = (event) => {
    if (event?.key !== 'Enter') {
      return;
    }
    handleOnSend();
  };

  // handle emoji
  const onEmojiClick = (event, emojiObject) => {
    setMessage(message + emojiObject.emoji);
  };

  const emojiOpen = Boolean(anchorElEmoji);
  const emojiId = emojiOpen ? 'simple-popper' : undefined;

  const handleCloseEmoji = () => {
    setAnchorElEmoji(null);
  };

  useEffect(() => {
    setUser(chatState.user);
  }, [chatState.user]);

  useEffect(() => {
    setData(chatState.chats);
  }, [chatState.chats]);

  useEffect(() => {
    // hide left drawer when email app opens
    dispatch(openDrawer(false));
    dispatch(getUser(1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getUserChats(user.name));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Main>
        <Grid container>
          <Grid item xs={12}>
            <MainCard
              content={false}
              sx={{
                bgcolor: theme.palette.mode === 'dark' ? 'dark.main' : 'grey.50',
                pt: 2,
                pl: 2,
                borderRadius: '0 4px 4px 0'
              }}
            >
              <Grid container spacing={3}>
                <Grid
                  item
                  xs={12}
                  sx={{
                    bgcolor: theme.palette.background.paper,
                    pr: 2,
                    pb: 2,
                    borderBottom: `1px solid ${theme.palette.divider}`
                  }}
                >
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <UserAvatar
                          user={{
                            online_status: user.online_status,
                            avatar: user.avatar,
                            name: user.name
                          }}
                        />
                        <Stack>
                          <Typography variant="subtitle1">{user.name}</Typography>
                          <Typography variant="caption" color="textSecondary">
                            Active {user.lastMessage} ago
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <SimpleBar
                    sx={{
                      overflowX: 'hidden',
                      height: 'calc(100vh - 410px)',
                      minHeight: 420
                    }}
                  >
                    <Box sx={{ pl: 1, pr: 3 }}>
                      <ChatHistory theme={theme} user={user} data={data} />
                    </Box>
                  </SimpleBar>
                </Grid>
                <Grid item xs={12} sx={{ mt: 3, bgcolor: theme.palette.background.paper, borderTop: `1px solid ${theme.palette.divider}` }}>
                  <Stack>
                    <TextField
                      inputRef={textInput}
                      fullWidth
                      multiline
                      rows={4}
                      placeholder="Your Message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value.length <= 1 ? e.target.value.trim() : e.target.value)}
                      onKeyPress={handleEnter}
                      variant="standard"
                      sx={{
                        pr: 2,
                        '& .MuiInput-root:before': { borderBottomColor: theme.palette.divider }
                      }}
                    />
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" sx={{ py: 2, ml: -1 }}>
                        <IconButton sx={{ opacity: 0.5 }} size="medium" color="secondary">
                          <PaperClipOutlined />
                        </IconButton>
                        <IconButton sx={{ opacity: 0.5 }} size="medium" color="secondary">
                          <PictureOutlined />
                        </IconButton>
                        <Grid item>
                          <IconButton
                            ref={anchorElEmoji}
                            aria-describedby={emojiId}
                            onClick={handleOnEmojiButtonClick}
                            sx={{ opacity: 0.5 }}
                            size="medium"
                            color="secondary"
                          >
                            <SmileOutlined />
                          </IconButton>
                          <Popper
                            id={emojiId}
                            open={emojiOpen}
                            anchorEl={anchorElEmoji}
                            disablePortal
                            popperOptions={{
                              modifiers: [
                                {
                                  name: 'offset',
                                  options: {
                                    offset: [-20, 20]
                                  }
                                }
                              ]
                            }}
                          >
                            <ClickAwayListener onClickAway={handleCloseEmoji}>
                              <>
                                {emojiOpen && (
                                  <MainCard elevation={8} content={false}>
                                    <Picker onEmojiClick={onEmojiClick} skinTone={SKIN_TONE_MEDIUM_DARK} disableautoFocus />
                                  </MainCard>
                                )}
                              </>
                            </ClickAwayListener>
                          </Popper>
                        </Grid>
                        <IconButton sx={{ opacity: 0.5 }} size="medium" color="secondary">
                          <SoundOutlined />
                        </IconButton>
                      </Stack>
                      <IconButton color="primary" onClick={handleOnSend} size="large" sx={{ mr: 1.5 }}>
                        <SendOutlined />
                      </IconButton>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        </Grid>
      </Main>
    </Box>
  );
};

export default Chat;
