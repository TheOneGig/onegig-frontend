import { useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useQuery, useMutation } from 'react-query';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Grid, Stack, TextField, Typography } from '@mui/material';

// project import
import ChatHistory from 'sections/apps/chat/ChatHistory';
import { dispatch } from 'store';
import { insertChat } from 'store/reducers/chat';
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import SimpleBar from 'components/third-party/SimpleBar';
import { openSnackbar } from 'store/reducers/snackbar';

// assets
import { SendOutlined } from '@ant-design/icons';
import { getMessages, createMessage } from 'hooks/projects';
import useAuth from 'hooks/useAuth';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(() => ({ flexGrow: 1 }));
const Chat = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const userId = user.id;
  const { projectId } = useParams();
  const { data: project, isLoading: loadingProject, refetch } = useQuery(['project'], () => getMessages({ projectId }));
  const { mutate } = useMutation(['newMessage'], (variables) => createMessage(variables), {
    onSuccess: () => {
      refetch();
    }
  });

  function handleSubmit(message) {
    const variables = { projectId, userId, message };
    return mutate({ variables });
  }

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
      handleSubmit(message);
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

  if (loadingProject) {
    return <div>Loading project chat...</div>;
  }

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
                        <Stack>
                          <Typography variant="subtitle1">{project.name}</Typography>
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
                      <ChatHistory theme={theme} user={user} data={project.messages} />
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
                        {/* <IconButton sx={{ opacity: 0.5 }} size="medium" color="secondary">
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
                        </IconButton> */}
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
