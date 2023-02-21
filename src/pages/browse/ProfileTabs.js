import PropTypes from 'prop-types';
import { Divider, Grid, TextField, Stack, Typography, Chip, CardHeader } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';

// assets
import avatar1 from 'assets/images/users/avatar-1.png';

// ==============================|| USER PROFILE - TAB CONTENT ||============================== //

const ProfileTabs = ({ user }) => {
  const { fname, lname, email, nickname, phone, title, description, gigs, ownedProjects, avatar, skills } = user;
  const activeProjects = ownedProjects.map((project) => project.status === 'ACTIVE');

  return (
    <MainCard>
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
              <Typography color="secondary">Active Projects</Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Typography color="secondary">{description}</Typography>
        </Grid>
        <Grid item xs={12}>
          <CardHeader title="Skills" />
          <Divider sx={{ marginBottom: 2 }} />
          {skills.map((skill) => (
            <Chip
              key={skill.skillId}
              variant="combined"
              label={skill.skill}
              sx={{ color: 'text.primary', marginRight: 2, marginBottom: 2 }}
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