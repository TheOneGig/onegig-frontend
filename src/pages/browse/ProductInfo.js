import { useState } from 'react';
import { useMutation } from 'react-query';
import PropTypes from 'prop-types';

import { Button, Stack, Typography } from '@mui/material';

// assets
import { formatUSD } from 'utils/formatUSD';
import ProjectLead from './drawerInterested';
import { createGigPayment } from 'hooks/stripe';
import { Box, Drawer, Group, TextInput, Title, Divider, List } from '@mantine/core';
import ProductImages from 'sections/apps/e-commerce/product-details/ProductImages';
import { hasLength, isEmail, useForm } from '@mantine/form';
import { IconShare, IconCheck } from '@tabler/icons-react';

import { showNotification } from '@mantine/notifications';

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
      debug: false,
      returnBaseUrl: window.location.origin
    };
    return mutate({ variables });
  }

  const deliverables = gig.deliverables.split(',');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    showNotification({
      id: 'copy-url',
      color: 'teal',
      title: 'URL Copied!',
      message: 'The URL has been copied to your clipboard.',
      icon: <IconCheck size="1rem" />,
      autoClose: 2000
    });
  };

  return (
    <Stack spacing={2.5}>
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ mt: 4 }}>
        <Typography variant="h2" sx={{ fontSize: '2.5rem' }}>
          {gig.name}
        </Typography>
        <IconShare
          style={{
            cursor: 'pointer'
          }}
          onClick={copyToClipboard}
        />
      </Stack>
      <Stack spacing={2.5}>
        <Divider sx={{ marginBottom: 2 }} />
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="h4">{` Starting Price: ${formatUSD(gig.price)}`}</Typography>
        </Stack>
        <Divider sx={{ marginBottom: 2 }} />
      </Stack>
      <Stack spacing={4}>
        <Stack spacing={2.5}>
          <Typography variant="h4" sx={{ mt: 2 }}>
            Description:
          </Typography>
          <Typography variant="h5">{gig.description}</Typography>
        </Stack>
        <ProductImages images={gig.files} />
        <Stack spacing={2.5}>
          {deliverables ? (
            <>
              <Typography variant="h4">Deliverables:</Typography>
              <List sx={{ fontWeight: 600 }}>
                {deliverables.map((deliverable, index) => (
                  <List.Item key={index}>{deliverable}</List.Item>
                ))}
              </List>
            </>
          ) : (
            <></>
          )}
        </Stack>
        {/* <Stack spacing={2.5}>
          {
            requirements ? 
              ( 
                <>
                  <Typography variant="h4" >Requirements:</Typography>
                    <List  sx={{ color: '#111', fontWeight: 500 }} >
                      { requirements.map((requirement, index) => (
                    <List.Item key={index}>{requirement}</List.Item>
                    ))}
                  </List>
                </>
              ) 
              :
              (<></>)
          }
        
        </Stack> */}
      </Stack>
      <Stack direction="row" justifyContent="center" padding={4} spacing={2.5}>
        <Button
          sx={{
            backgroundColor: '#13502f',
            color: '#f1f1f1',
            padding: '10px 70px',
            '&:hover': {
              backgroundColor: '#0eba9b',
              color: '#f1f1f1',
              transition: '0.3s'
            }
          }}
          size="large"
          disabled={isLoading}
          onClick={() => setOpened(true)}
        >
          {`I'm Interested`}
        </Button>
        <Button
          size="large"
          disabled={isLoading}
          onClick={() => setEmailOpened(true)}
          sx={{
            backgroundColor: '#13502f',
            color: '#f1f1f1',
            padding: '10px 70px',
            '&:hover': {
              backgroundColor: '#0eba9b',
              color: '#f1f1f1',
              transition: '0.3s'
            }
          }}
        >
          {`Request Services`}
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
