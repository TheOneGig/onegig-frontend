// react

import React, { useState } from 'react';

// material-ui
import { Box, Button, Grid, Stack, TextField, Typography, MenuItem, Select } from '@mui/material';
import { createReferal } from 'hooks/referals';
import { IconCheck } from '@tabler/icons-react';
import { showNotification } from '@mantine/notifications';
import { createClientNotification } from 'hooks/notifications';
import useClient from 'hooks/useClient';
import { useMutation } from 'react-query';
// ==============================|| REPORT ISSUE- FORM ||============================== //

function ReferalForm() {
  const { clientId } = useClient();
  const [userRelation, setUserRelation] = useState('Select an option')
  const [ firstName, setFirstName] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ email , setEmail] = useState('');
  const [ phoneNumber, setPhoneNumber] = useState('')
  const [ info, setInfo] = useState('');

  const createNotificationMutation = useMutation(createClientNotification);
  const { mutate, isLoading } = useMutation(['createReferal'], (variables) => createReferal(variables), {
    onSuccess: () => {
      refetch();
      setUserRelation('')
      setFirstName('')
      setLastName('')
      setEmail('')
      setPhoneNumber('')
      setInfo('')
      showNotification({
        id: 'load-data',
        color: 'teal',
        title: 'Referal Send!',
        message: 'Your referal was send succesfully, you can close this notification',
        icon: <IconCheck size="1rem" />,
        autoClose: 3000
      });
      createNotificationMutation.mutate({
        variables: {
          clientId: clientId,
          message: 'You have created a new contract!'
        }
      });
    }
  });

  const handleSubmit = () => {
    const variables = {
        clientId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        relation: userRelation,
        info: info
    }

    return mutate({ variables })
  }
 
  return (
    <Box sx={{ p: { xs: 2.5, sm: 0 } }}>
      <Grid container spacing={5} justifyContent="center">
        <Grid item xs={12} sm={10} lg={9}>
          <Stack alignItems="center" justifyContent="center" spacing={2}>
            <Typography align="center" variant="h2">
              Refer a Friend!
            </Typography>
            <Typography variant="caption" align="center" color="textSecondary" sx={{ maxWidth: '355px' }}>
              Know someone who might need our services? Refer them, so we may offer our services.
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={10} lg={9}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Last Name</Typography>
              <TextField value={lastName} onChange={(e) => setLastName(e.target.value)} fullWidth type="text" placeholder="Name and last name" sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">First Name</Typography>
              <TextField value={firstName} onChange={(e) => setFirstName(e.target.value)} fullWidth type="text" placeholder="Name and last name" sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Phone Number</Typography>
              <TextField value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} fullWidth type="text" placeholder="Phone Number" sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">E-mail</Typography>
              <TextField value={email} onChange={(e) => setEmail(e.target.value)} fullWidth type="email" placeholder="Email Address" sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">User Relation?</Typography>
              <Select 
                fullWidth 
                variant="outlined"
                value={userRelation} 
                onChange={(e) => setUserRelation(e.target.value)}
                sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }}
              >
                <MenuItem value="Select an option">Select an option</MenuItem>
                <MenuItem value="Friend">Friend</MenuItem>
                <MenuItem value="Family">Family</MenuItem>
                <MenuItem value="Co worker">Co worker</MenuItem>
                <MenuItem value="Someone I know">Someone I know</MenuItem>
                <MenuItem value="Friend of Friend">Friend of Friend</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Adicional Information?</Typography>
              <TextField value={info} onChange={(e) => setInfo(e.target.value)}  fullWidth multiline rows={4} placeholder="Message" sx={{ '& .MuiOutlinedInput-input': { opacity: 0.5 } }} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={10} lg={9}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1 }}
            justifyContent="flex-end"
            alignItems={{ xs: 'stretch', sm: 'flex-end' }}
          >
            <Button disabled={isLoading} onClick={handleSubmit} variant="contained" sx={{ ml: { xs: 0 } }}>
              Submit
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
export default ReferalForm;
