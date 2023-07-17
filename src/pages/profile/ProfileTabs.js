import { useMutation, useQuery } from 'react-query';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Divider, FormLabel, Grid, TextField, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import ProfileTab from './ProfileTab';

// assets
import { CameraOutlined } from '@ant-design/icons';
import { uploadFile } from 'react-s3';
import useAuth from 'hooks/useAuth';
import { avatarUser, getUser } from 'hooks/users';
import avatar1 from 'assets/images/users/avatar-1.png';

const config = {
  bucketName: 'onegig-uploads',
  region: 'us-east-1',
  accessKeyId: process.env.REACT_APP_AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_S3_SECRET_ACCESS_KEY
};

// ==============================|| USER PROFILE - TAB CONTENT ||============================== //

const ProfileTabs = () => {
  const theme = useTheme();
  const location = useLocation();
  const { user } = useAuth();
  const userId = user.id;
  const { data: userInfo, isLoading, refetch } = useQuery(['user'], () => getUser({ userId }));
  const { mutate } = useMutation(['avatarUser'], (variables) => avatarUser(variables), {
    onSuccess: () => {
      refetch();
    }
  });

  function submitAvatar(fileUrl) {
    const variables = { userId, fileUrl };
    return mutate({ variables });
  }

  const handleUpload = async (file) => {
    uploadFile(file, config)
      .then((data) => submitAvatar(data.location))
      .catch((err) => console.error(err));
  };

  if (isLoading) {
    return <div>Loading profile...</div>;
  }
  const { fname, lname, email, nickname, phone, title, gigs, ownedProjects, avatar } = userInfo;
  const activeProjects = ownedProjects?.filter((p) => p.status !== 'ARCHIVED');

  return (
    <MainCard>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Stack spacing={2.5} alignItems="center">
            <FormLabel
              htmlFor="change-avtar"
              sx={{
                position: 'relative',
                borderRadius: '50%',
                overflow: 'hidden',
                '&:hover .MuiBox-root': { opacity: 1 },
                cursor: 'pointer'
              }}
            >
              <Avatar alt="Avatar 1" src={avatar ? avatar.fileUrl : avatar1} sx={{ width: 124, height: 124, border: '2px solid' }} />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Stack spacing={0.5} alignItems="center">
                  <CameraOutlined style={{ color: theme.palette.secondary.lighter, fontSize: '2rem' }} />
                  <Typography sx={{ color: 'secondary.lighter' }}>Upload</Typography>
                </Stack>
              </Box>
            </FormLabel>
            <TextField
              type="file"
              id="change-avtar"
              label="Outlined"
              variant="outlined"
              sx={{ display: 'none' }}
              onChange={(e) => handleUpload(e.target.files?.[0])}
            />
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="h5">
                {fname} {lname} ({nickname})
              </Typography>
              <Typography color="secondary">{title}</Typography>
              <Typography color="secondary">{email}</Typography>
              <Typography color="secondary">+1{phone}</Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item sm={3} sx={{ display: { sm: 'block', md: 'none' } }} />
        <Grid item xs={12} sm={6} md={12}>
          <Stack direction="row" justifyContent="space-around" alignItems="center">
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="h5">{gigs.length}</Typography>
              <Typography color="secondary">Gigs</Typography>
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="h5">{activeProjects.length}</Typography>
              <Typography color="secondary">Projects</Typography>
            </Stack>
          </Stack>
        </Grid>
        {location.pathname !== '/new/profile/personal' && (
          <Grid item xs={12}>
            <ProfileTab />
          </Grid>
        )}
      </Grid>
    </MainCard>
  );
};

ProfileTabs.propTypes = {
  focusInput: PropTypes.func
};

export default ProfileTabs;
