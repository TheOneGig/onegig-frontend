import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Button, Stack } from '@mui/material';
import MainCard from 'components/MainCard';
import { Grid, NumberInput, TextInput } from '@mantine/core';
import useAuth from 'hooks/useAuth';
import { getUser, updateSettings } from 'hooks/users';

// ==============================|| TAB - SETTINGS ||============================== //

const TabSettings = () => {
  const [newPayoutAccount, setNewPayoutAccount] = useState();
  const [newPayoutRoute, setNewPayoutRoute] = useState();
  const [newCalUrl, setCalUrl] = useState();
  const { user } = useAuth();
  const userId = user.id;
  const { data: userInfo, isLoading, refetch } = useQuery(['user'], () => getUser({ userId }));
  const { mutate } = useMutation(['updateSettings'], (variables) => updateSettings(variables), {
    onSuccess: () => {
      refetch();
    }
  });

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  const { payoutAccount, payoutRoute, calUrl } = userInfo;

  function handleSubmit() {
    const thepayoutAccount = newPayoutAccount ? newPayoutAccount.toString() : payoutAccount;
    const thepayoutRoute = newPayoutRoute ? newPayoutRoute.toString() : payoutRoute;
    const thecalUrl = newCalUrl ? newCalUrl : calUrl;
    const variables = { userId, payoutAccount: thepayoutAccount, payoutRoute: thepayoutRoute, calUrl: thecalUrl };
    return mutate({ variables });
  }

  return (
    <MainCard title="Settings">
      <Grid>
        <Grid.Col span={6}>
          <NumberInput label="Account Number" defaultValue={Number(payoutAccount)} onChange={(value) => setNewPayoutAccount(value)} />
        </Grid.Col>
        <Grid.Col span={6}>
          <NumberInput label="Route Number" defaultValue={Number(payoutRoute)} onChange={(value) => setNewPayoutRoute(value)} />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput label="Cal URL" defaultValue={calUrl} onChange={(e) => setCalUrl(e.target.value)} />
          <p>
            Register <a href="https://cal.com/">here</a> for a calendar and input the url here.
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
