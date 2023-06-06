import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Button, Stack } from '@mui/material';
import MainCard from 'components/MainCard';
import { Grid, TextInput } from '@mantine/core';
import useAuth from 'hooks/useAuth';
import { getUser, updateSettings } from 'hooks/users';
import { createConnectAccount } from 'hooks/stripe';

// ==============================|| TAB - SETTINGS ||============================== //

const TabSettings = () => {
  const [newCalUrl, setCalUrl] = useState();
  const { user } = useAuth();
  const userId = user.id;
  const { data: userInfo, isLoading, refetch } = useQuery(['user'], () => getUser({ userId }));
  const { mutate } = useMutation(['updateSettings'], (variables) => updateSettings(variables), {
    onSuccess: () => {
      setCalUrl();
      refetch();
    }
  });

  const { mutate: createStripeConnect } = useMutation(['createConnect'], (variables) => createConnectAccount(variables), {
    onSuccess: (e) => {
      window.open(e.url, '_blank');
      refetch();
    }
  });

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  const { calUrl, email, stripeConnect } = userInfo;

  function handleSubmit() {
    const thecalUrl = newCalUrl ? (newCalUrl?.startsWith('https://cal.com/') ? newCalUrl.slice(16) : newCalUrl) : calUrl;
    const variables = { userId, calUrl: thecalUrl };
    return mutate({ variables });
  }

  function createConnect() {
    const variables = { email };
    return createStripeConnect({ variables });
  }

  return (
    <MainCard title="Settings">
      <Grid>
        <Grid.Col span={12}>
          <p>Banking Information</p>
          {stripeConnect ? (
            <Button
              onClick={() => window.open(`https://connect.stripe.com/express_login`, '_blank')}
              className="create-btn blue-btn"
              variant="light"
            >
              Payout Dashboard
            </Button>
          ) : (
            <Button onClick={() => createConnect()} className="create-btn blue-btn" variant="light">
              Setup
            </Button>
          )}
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput label="Cal URL" defaultValue={calUrl} onChange={(e) => setCalUrl(e.target.value)} />
          <p>
            Register{' '}
            <a href="https://cal.com/" target="_blank" rel="noreferrer">
              here
            </a>{' '}
            for a calendar and input the url here.
          </p>
        </Grid.Col>
      </Grid>
      <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
        <Button variant="contained" onClick={() => handleSubmit()}>
          Save
        </Button>
      </Stack>
    </MainCard>
  );
};

export default TabSettings;
