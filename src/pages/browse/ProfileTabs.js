import PropTypes from 'prop-types';
import { useState } from 'react';
import { Divider, Grid, TextField, Stack, Typography, Chip, CardHeader, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconSend } from '@tabler/icons-react';

// project import
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import ContactSeller from './contactSeller';

// assets
import avatar1 from 'assets/images/users/avatar-1.png';

// ==============================|| USER PROFILE - TAB CONTENT ||============================== //

const ProfileTabs = ({ user }) => {
  const { fname, lname, email, nickname, phone, title, description, gigs, ownedProjects, avatar, skills } = user;
  const activeProjects = ownedProjects.filter((project) => project.status !== 'ARCHIVED' && project.status !== 'LEAD');
  const [opened, setOpened] = useState(false);
  const theme = useTheme();

  return (
    <MainCard sx={{ backgroundColor: '#fff', color: '#111' }}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Stack spacing={2.5} alignItems="center">
            <Avatar alt="Avatar 1" src={avatar ? avatar.fileUrl : avatar1} sx={{ width: 124, height: 124, border: '1px dashed' }} />
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
              <Typography>{title}</Typography>
              <Typography>{email}</Typography>
              <Typography>+1{phone}</Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Button
            fullWidth
            variant="outline"
            size="large"
            sx={{
              backgroundColor: theme.palette.primary.light,
              color: '#f1f1f1',
              borderRadius: '50px',
              padding: '10px 30px',
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                transition: '0.3s'
              }
            }}
            onClick={() => setOpened(true)}
          >
            <IconSend style={{ marginRight: 5 }} /> Contact Seller
          </Button>
          <ContactSeller opened={opened} setOpened={setOpened} />
        </Grid>
        <Grid item sm={3} sx={{ display: { sm: 'block', md: 'none' } }} />
        <Grid item xs={12} sm={6} md={12}>
          <Stack direction="row" justifyContent="space-around" alignItems="center">
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="h5">{gigs.length}</Typography>
              <Typography>Gigs</Typography>
            </Stack>
            <Divider
              orientation="vertical"
              sx={{
                backgroundColor: '#111'
              }}
              flexItem
            />
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="h5">{activeProjects.length}</Typography>
              <Typography>Active Projects</Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ textAlign: 'justify' }}>{description}</Typography>
        </Grid>
        <Grid item xs={12}>
          <CardHeader title="Skills" />
          <Divider sx={{ marginBottom: 2, backgroundColor: '#111' }} />
          {skills.map((skill) => (
            <Chip
              key={skill.skillId}
              variant="combined"
              label={skill.skill}
              sx={{ backgroundColor: theme.palette.primary.light, color: 'text.primary', marginRight: 2, marginBottom: 2 }}
            />
          ))}
        </Grid>
      </Grid>
    </MainCard>
  );
};

ProfileTabs.propTypes = {
  user: PropTypes.object
};

export default ProfileTabs;

/* <Typography color="secondary">{title}</Typography>
   <Typography color="secondary">{email}</Typography>
   <Typography color="secondary">+1{phone}</Typography> */
