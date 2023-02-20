import { Box, Button, Drawer, Group, NumberInput, Select, Textarea, TextInput, Title } from '@mantine/core';
import { useForm, hasLength, isInRange } from '@mantine/form';
import { createProject } from 'hooks/projects';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useMutation } from 'react-query';

// ==============================|| GIGS ||============================== //

const ProjectCreate = ({ opened, setOpened, refetch, userId, gigs }) => {
  const [gigId, setGigId] = useState('');
  const { mutate, isLoading } = useMutation(['createProject'], (variables) => createProject(variables), {
    onSuccess: () => {
      refetch();
      setOpened(false);
    }
  });
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      price: 100
    },

    validate: {
      name: hasLength({ min: 2, max: 20 }, 'Name must be 2-20 characters long'),
      description: hasLength({ min: 5, max: 140 }, 'Name must be 5-140 characters long'),
      price: isInRange({ min: 10 }, 'Price  minimum is $10')
    }
  });

  function handleSubmit(values) {
    const price = parseInt(values.price * 100);
    const variables = { name: values.name, description: values.description, price, userId, gigId: gigId && gigId };
    return mutate({ variables });
  }

  const gigsOptions = gigs.map((gig) => {
    return { label: gig.name, value: gig.gigId };
  });

  function selectGig(id) {
    const gig = gigs.find((gig) => id === gig.gigId);
    setGigId(gig.gigId);
    form.setValues({
      name: gig.name,
      description: gig.description,
      price: gig.price / 100
    });
  }

  return (
    <Drawer opened={opened} onClose={() => setOpened(false)} title="Register" padding="xl" size="xl" position="right">
      <Box component="form" maw={400} mx="auto" onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Title order={1}>New Project</Title>
        <Select label="Gig" placeholder="Pick a gig" data={gigsOptions} value={gigId} onChange={selectGig} />
        <TextInput label="Name" placeholder="Name" withAsterisk {...form.getInputProps('name')} />
        <Textarea
          label="Description"
          placeholder="Brief description of this project..."
          withAsterisk
          mt="md"
          {...form.getInputProps('description')}
        />
        <NumberInput
          label="Price"
          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          formatter={(value) => (!Number.isNaN(parseFloat(value)) ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '$ ')}
          {...form.getInputProps('price')}
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
ProjectCreate.propTypes = {
  userId: PropTypes.string,
  opened: PropTypes.bool,
  setOpened: PropTypes.func,
  refetch: PropTypes.func,
  gigs: PropTypes.array
};

export default ProjectCreate;
