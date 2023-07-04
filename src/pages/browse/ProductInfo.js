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
import { useTheme } from '@mui/material/styles';

// ==============================|| PRODUCT DETAILS - INFORMATION ||============================== //

const ProductInfo = ({ gig }) => {
  const [opened, setOpened] = useState(false);
  const [emailOpened, setEmailOpened] = useState(false);
  const [saved, setSaved] = useState(false);
  const theme = useTheme();
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
      debug: false,
      returnBaseUrl: window.location.origin
    };
    return mutate({ variables });
  }

  const deliverables = gig.deliverables.split(',');

  return (
    <Stack spacing={2.5}>
      <Stack direction="row" alignItems="center" spacing={14}>
        <Typography color="primary" variant="h3">
          {gig.name}
        </Typography>
        <Typography variant="h3">{formatUSD(gig.price)}</Typography>
      </Stack>
      <Stack direction="column" spacing={2}>
        <Typography variant="h4">Deliverables:</Typography>
        <ul>
          {deliverables.map((deliverable, index) => (
            <li key={index}>{deliverable}</li>
          ))}
        </ul>
        <Typography style={{ textAlign: 'justify' }}>{gig.description}</Typography>
      </Stack>
      <Stack direction="row" spacing={3.5} sx={{ mt: 4 }}>
        <Button
          color="primary"
          sx={{
            borderRadius: '100%',
            padding: '20px 20px',
            '&:hover': {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              transition: '0.3s'
            }
          }}
          variant="outlined"
          size="large"
          disabled={isLoading}
          onClick={() => setOpened(true)}
        >
          button
        </Button>
        <Button
          color="primary"
          variant="outlined"
          size="large"
          disabled={isLoading}
          onClick={() => setEmailOpened(true)}
          sx={{
            borderRadius: '100%',
            padding: '20px 20px',
            '&:hover': {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              transition: '0.3s'
            }
          }}
        >
          button
        </Button>
        <Button
          color="primary"
          variant="outlined"
          disabled={isLoading}
          sx={{
            borderRadius: '100%',
            padding: '20px 20px',

            '&:hover': {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              transition: '0.3s'
            }
          }}
        >
          button
        </Button>
        <Button
          color="primary"
          variant="outlined"
          disabled={isLoading}
          sx={{
            borderRadius: '100%',
            padding: '20px 20px',

            '&:hover': {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              transition: '0.3s'
            }
          }}
          onClick={() => setSaved(!saved)}
        >
          {saved ? button : button}
        </Button>
      </Stack>

      <ProjectLead opened={opened} setOpened={setOpened} gig={gig} />

      <Drawer opened={emailOpened} onClose={() => setEmailOpened(false)} padding="xl" size="xl" position="right">
        <Box component="form" maw={400} mx="auto" onSubmit={form.onSubmit((values) => handleBuy(values))} sx={{ paddingTop: '40px' }}>
          <Title order={1}>Buy Now!</Title>

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
