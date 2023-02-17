import { useMutation } from 'react-query';
import { Box, Button, Drawer, Group, NumberInput, Textarea, TextInput, Title } from '@mantine/core';
import { useForm, hasLength, isInRange, isEmail } from '@mantine/form';
import { createLead } from 'hooks/gigs';
import PropTypes from 'prop-types';
import { openSnackbar } from 'store/reducers/snackbar';
import { dispatch } from 'store';
// ==============================|| GIGS ||============================== //

const ProjectLead = ({ opened, setOpened, gig }) => {
  const { mutate, isLoading } = useMutation(['createLead'], (variables) => createLead(variables), {
    onSuccess: () => {
      dispatch(
        openSnackbar({
          open: true,
          message: 'Interest sent successfully.',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
      setOpened(false);
    }
  });
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      message: '',
      budget: gig.price / 100
    },

    validate: {
      name: hasLength({ min: 2, max: 20 }, 'Name must be 2-20 characters long'),
      email: isEmail('Invalid email'),
      message: hasLength({ min: 5, max: 140 }, 'Name must be 5-140 characters long'),
      budget: isInRange({ min: 10 }, 'Budget minimum is $10')
    }
  });

  function handleSubmit(values) {
    const budget = parseInt(values.budget * 100);
    const variables = { gigId: gig.gigId, name: values.name, email: values.email, message: values.message, budget };
    return mutate({ variables });
  }

  return (
    <Drawer opened={opened} onClose={() => setOpened(false)} title="Register" padding="xl" size="xl" position="right">
      <Box component="form" maw={400} mx="auto" onSubmit={form.onSubmit((values) => handleSubmit(values))} sx={{ paddingTop: '40px' }}>
        <Title order={1}>{`I'm Interested`}</Title>

        <p>This is in no way a commitment. We will contact you as soon as possible so we can start a conversation about what you need.</p>

        <TextInput label="Name" placeholder="Name" withAsterisk {...form.getInputProps('name')} />

        <TextInput label="Email" placeholder="Email" withAsterisk {...form.getInputProps('email')} />

        <Textarea
          label="Message"
          placeholder="Brief description of what you are looking for..."
          withAsterisk
          mt="md"
          {...form.getInputProps('message')}
        />
        <p>Do you have a budget in mind? This is just to give us an idea.</p>
        <NumberInput
          label="Budget"
          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          formatter={(value) => (!Number.isNaN(parseFloat(value)) ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '$ ')}
          {...form.getInputProps('budget')}
        />

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
ProjectLead.propTypes = {
  gig: PropTypes.object,
  opened: PropTypes.bool,
  setOpened: PropTypes.func,
  refetch: PropTypes.func
};

export default ProjectLead;
