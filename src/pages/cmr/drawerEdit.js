import { Box, Button, Drawer, Group, Select, TextInput, Title } from '@mantine/core';
import { useForm, hasLength } from '@mantine/form';
import { updateClient } from 'hooks/clients';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

// ==============================|| GIGS ||============================== //

const ClientEdit = ({ opened, setOpened, client, refetch }) => {
  const [selectedStatus, setSelectedStatus] = useState(client ? client.status : 'Active');
  const { mutate, isLoading } = useMutation(['updateClient'], (variables) => updateClient(variables), {
    onSuccess: () => {
      refetch();
      setOpened(false);
      showNotification({
        id: 'load-data',
        color: 'teal',
        title: 'Client Info Edited!',
        message: 'Congratulations! your client was edited succesfully, you can close this notification',
        icon: <IconCheck size="1rem" />,
        autoClose: 3000
      });
      form.reset();
    }
  });
  const form = useForm({
    initialValues: {
      firstName: client ? client.firstName : '',
      lastName: client ? client.lastName : '',
      phoneNumber: client ? client.phoneNumber : '',
      city: client ? client.city : ''
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
      phoneNumber: values.phoneNumber,
      city: values.city,
      status: selectedStatus
    };
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
        <Title order={1}>Edit Client</Title>
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
ClientEdit.propTypes = {
  client: PropTypes.shape({
    status: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phoneNumber: PropTypes.string,
    city: PropTypes.string
  }).isRequired,
  opened: PropTypes.bool,
  setOpened: PropTypes.func,
  refetch: PropTypes.func
};

export default ClientEdit;
