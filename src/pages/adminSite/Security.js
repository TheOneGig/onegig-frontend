import React, { useState } from 'react';
import {
  Box,  
  Button,
  Checkbox,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Switch,
  Typography
} from '@mui/material';
import MainCard from 'components/MainCard';

const SecuritySettings = () => {
  const [checked, setChecked] = useState({
    emailNotifications: true,
    personalEmailCopy: false,
    systemUpdates: true,
    newNotifications: true,
    directMessages: true,
    connectionRequests: true,
    newOrders: true,
    membershipApprovals: false,
    memberRegistrations: true
  });

  const handleToggle = (setting) => {
    setChecked((prevChecked) => ({
      ...prevChecked,
      [setting]: !prevChecked[setting]
    }));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <MainCard title="Email Notifications">
          <Stack spacing={2.5}>
            <Typography variant="subtitle1">General Email Settings</Typography>
            <List sx={{ p: 0, '& .MuiListItem-root': { p: 0, py: 0.25 } }}>
              <ListItem>
                <ListItemText
                  primary="Receive Email Notifications"
                />
                <Switch
                  edge="end"
                  onChange={() => handleToggle('emailNotifications')}
                  checked={checked.emailNotifications}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Send Copy of Notifications to Personal Email"
                />
                <Switch
                  edge="end"
                  onChange={() => handleToggle('personalEmailCopy')}
                  checked={checked.personalEmailCopy}
                />
              </ListItem>
            </List>
          </Stack>
        </MainCard>
      </Grid>
      <Grid item xs={12} sm={6}>
        <MainCard title="System Updates">
          <Stack spacing={2.5}>
            <Typography variant="subtitle1">Receive Updates and Notifications</Typography>
            <List sx={{ p: 0, '& .MuiListItem-root': { p: 0, py: 0.25 } }}>
              <ListItem>
                <ListItemText
                  primary="Receive News about System Updates"
                />
                <Checkbox
                  onChange={() => handleToggle('systemUpdates')}
                  checked={checked.systemUpdates}
                />
              </ListItem>
            </List>
          </Stack>
          <Box sx={{ pt: 5.60 }}>
      
        </Box>
        </MainCard>
      </Grid>
      <Grid item xs={12}>
        <MainCard title="Activity Notifications">
          <Stack spacing={2.5}>
            <Typography variant="subtitle1">Activity-Related Email Notifications</Typography>
            <List sx={{ p: 0, '& .MuiListItem-root': { p: 0, py: 0.25 } }}>
              <ListItem>
                <ListItemText
                  primary="Receive Notifications for New Activities"
                />
                <Switch
                  edge="end"
                  onChange={() => handleToggle('newNotifications')}
                  checked={checked.newNotifications}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Receive Direct Messages"
                />
                <Switch
                  edge="end"
                  onChange={() => handleToggle('directMessages')}
                  checked={checked.directMessages}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Receive Connection Requests"
                />
                <Switch
                  edge="end"
                  onChange={() => handleToggle('connectionRequests')}
                  checked={checked.connectionRequests}
                />
              </ListItem>
            </List>
            <Divider />
            <Typography variant="subtitle1">Order and Membership Notifications</Typography>
            <List sx={{ p: 0, '& .MuiListItem-root': { p: 0, py: 0.25 } }}>
              <ListItem>
                <ListItemText
                  primary="Auto-Renew Membership"
                />
                <Switch
                  edge="end"
                  onChange={() => handleToggle('autoRenew')}
                  checked={checked.autoRenew}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Receive Notifications for Membership Updates"
                />
                <Switch
                  edge="end"
                  onChange={() => handleToggle('membershipUpdates')}
                  checked={checked.membershipUpdates}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Receive Notifications for Member Registrations"
                />
                <Switch
                  edge="end"
                  onChange={() => handleToggle('memberRegistrations')}
                  checked={checked.memberRegistrations}
                />
              </ListItem>
            </List>
          </Stack>
        </MainCard>
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
          <Button variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button variant="contained">Save Settings</Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default SecuritySettings;
