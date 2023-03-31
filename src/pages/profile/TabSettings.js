import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Button, Stack } from '@mui/material';
import MainCard from 'components/MainCard';
import { Grid, NumberInput } from '@mantine/core';
import useAuth from 'hooks/useAuth';
import { getUser, payoutUser } from 'hooks/users';

// ==============================|| TAB - SETTINGS ||============================== //

const TabSettings = () => {
  const [newPayoutAccount, setNewPayoutAccount] = useState();
  const [newPayoutRoute, setNewPayoutRoute] = useState();
  const { user } = useAuth();
  const userId = user.id;
  const { data: userInfo, isLoading, refetch } = useQuery(['user'], () => getUser({ userId }));
  const { mutate } = useMutation(['payoutUser'], (variables) => payoutUser(variables), {
    onSuccess: () => {
      refetch();
    }
  });

  function handleSubmit() {
    const variables = { userId, payoutAccount: newPayoutAccount.toString(), payoutRoute: newPayoutRoute.toString() };
    return mutate({ variables });
  }

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  const { payoutAccount, payoutRoute } = userInfo;

  return (
    <MainCard title="Settings">
      <Grid>
        <Grid.Col span={6}>
          <NumberInput label="Account Number" defaultValue={Number(payoutAccount)} onChange={(value) => setNewPayoutAccount(value)} />
        </Grid.Col>
        <Grid.Col span={6}>
          <NumberInput label="Route Number" defaultValue={Number(payoutRoute)} onChange={(value) => setNewPayoutRoute(value)} />
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
