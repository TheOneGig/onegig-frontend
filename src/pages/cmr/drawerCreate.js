import { Box, Button, Drawer, Group, Select, TextInput, Title } from '@mantine/core';
import { useForm, hasLength } from '@mantine/form';
import { createClient } from 'hooks/clients';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { createNotification } from 'hooks/notifications';

// ==============================|| GIGS ||============================== //

const ClientCreate = ({ opened, setOpened, refetch, userId, workspaceId }) => {
  const [selectedStatus, setSelectedStatus] = useState('Active');
  const createNotificationMutation = useMutation(createNotification);
  const { mutate, isLoading } = useMutation(['createClient'], (variables) => createClient(variables), {
    onSuccess: () => {
      refetch();
      setOpened(false);
      showNotification({
        id: 'load-data',
        color: 'teal',
        title: 'Client Created!',
        message: 'Congratulations! New client created succesfully, you can close this notification',
        icon: <IconCheck size="1rem" />,
        autoClose: 3000
      });
      createNotificationMutation.mutate({
        variables: {
          userId: userId,
          message: 'Added a new Client!'
        }
      });

      form.reset();
    }
  });
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      city: ''
    },

    validate: {
      firstName: hasLength({ min: 2, max: 20 }, 'Name must be 2-20 characters long'),
      lastName: hasLength({ min: 2, max: 20 }, 'Last Name must be 2-20 characters long')
    }
  });

  function handleSubmit(values) {
    const variables = {
      firstName: values.firstName,
      lastName: values.lastName,
      status: selectedStatus,
      email: values.email,
      city: values.city,
      phoneNumber: values.phoneNumber,
      userId: userId,
      workspaceId: workspaceId
    };
    console.log(variables);
    return mutate({ variables });
  }

  const statusOptions = [
    { label: 'Active', value: 'Active' },
    { label: 'Lead', value: 'Lead' },
    { label: 'InProcess', value: 'InProcess' },
    { label: 'Completed', value: 'Completed' }
  ];

  return (
    <Drawer opened={opened} onClose={() => setOpened(false)} title="Register" padding="xl" size="xl" position="right">
      <Box component="form" maw={400} mx="auto" onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Title order={1}>New Client</Title>
        <Select
          label="Status"
          placeholder="Select Status"
          data={statusOptions}
          value={selectedStatus}
          onChange={(selectedOption) => setSelectedStatus(selectedOption)}
        />
        <TextInput label="First Name" placeholder="First Name" withAsterisk {...form.getInputProps('firstName')} />
        <TextInput label="Last Name" placeholder=" Last Name" withAsterisk {...form.getInputProps('lastName')} />
        <TextInput label="City" placeholder="City" withAsterisk {...form.getInputProps('city')} />
        <TextInput label="Email" placeholder="Email" withAsterisk {...form.getInputProps('email')} />
        <TextInput label="Phone Number" placeholder="Phone Number" withAsterisk {...form.getInputProps('phoneNumber')} />
        <Group position="right" mt="md">
          <Button color="gray" onClick={() => setOpened(false)} loading={isLoading}>
            Cancel
          </Button>
          <Button type="submit" loading={isLoading}>
            Submit
          </Button>
        </Group>
      </Box>
    </Drawer>
  );
};
ClientCreate.propTypes = {
  userId: PropTypes.string,
  opened: PropTypes.bool,
  setOpened: PropTypes.func,
  refetch: PropTypes.func
};

export default ClientCreate;
