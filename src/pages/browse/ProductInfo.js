import { useState } from 'react';
import { useMutation } from 'react-query';
import PropTypes from 'prop-types';

import { Button, Stack, Typography } from '@mui/material';

// assets
import { formatUSD } from 'utils/formatUSD';
import ProjectLead from './drawerInterested';
import { createGigPayment } from 'hooks/stripe';
import { Box, Drawer, Group, TextInput, Title } from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';

// ==============================|| PRODUCT DETAILS - INFORMATION ||============================== //

const ProductInfo = ({ gig }) => {
  const [opened, setOpened] = useState(false);
  const [emailOpened, setEmailOpened] = useState(false);
  const { mutate, isLoading } = useMutation(['createGigPayment'], (variables) => createGigPayment(variables), {
    onSuccess: (data) => {
      window.open(data.url, '_blank');
    }
  });

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      phone: ''
    },

    validate: {
      name: hasLength({ min: 2, max: 20 }, 'Name must be 2-20 characters long'),
      email: isEmail('Invalid email'),
      phone: hasLength({ min: 10, max: 10 }, 'Phone must be exactly 10 characters long')
    }
  });

  function handleBuy(values) {
    const variables = {
      gigId: gig.gigId,
      name: gig.name,
      amount: gig.price,
      email: values.email,
      fullName: values.name,
      phone: values.phone,
      debug: true,
      returnBaseUrl: window.location.origin
    };
    return mutate({ variables });
  }

  const deliverables = gig.deliverables.split(',');
  console.log('deliverables:', deliverables);

  return (
    <Stack spacing={1}>
      <Typography variant="h3">{gig.name}</Typography>
      <Typography style={{ textAlign: 'justify' }}>{gig.description}</Typography>
      <Stack spacing={2.5}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="h3">{formatUSD(gig.price)}</Typography>
        </Stack>
      </Stack>
      <Typography variant="h4">Deliverables:</Typography>
      <ul>
        {deliverables.map((deliverable, index) => (
          <li key={index}>{deliverable}</li>
        ))}
      </ul>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 4 }}>
        <Button fullWidth color="secondary" variant="outlined" size="large" disabled={isLoading} onClick={() => setOpened(true)}>
          {`Contact Seller`}
        </Button>
        <Button fullWidth color="secondary" variant="outlined" size="large" disabled={isLoading} onClick={() => setEmailOpened(true)}>
          {`Buy Now`}
        </Button>
      </Stack>

      <ProjectLead opened={opened} setOpened={setOpened} gig={gig} />

      <Drawer opened={emailOpened} onClose={() => setEmailOpened(false)} padding="xl" size="xl" position="right">
        <Box component="form" maw={400} mx="auto" onSubmit={form.onSubmit((values) => handleBuy(values))} sx={{ paddingTop: '40px' }}>
          <Title order={1}>Your information</Title>

          <p>We just need a bit information for the seller to contact you.</p>

          <TextInput label="Name" placeholder="Name" withAsterisk {...form.getInputProps('name')} />

          <TextInput label="Email" placeholder="Email" withAsterisk {...form.getInputProps('email')} />

          <TextInput label="Phone" placeholder="Phone" withAsterisk {...form.getInputProps('phone')} />

          <Group position="right" mt="md">
            <Button color="secondary" variant="outlined" size="large" disabled={isLoading} onClick={() => setEmailOpened(false)}>
              Cancel
            </Button>
            <Button color="secondary" variant="outlined" size="large" disabled={isLoading} type="submit">
              Checkout
            </Button>
          </Group>
        </Box>
      </Drawer>
    </Stack>
  );
};

ProductInfo.propTypes = {
  gig: PropTypes.object
};

export default ProductInfo;
