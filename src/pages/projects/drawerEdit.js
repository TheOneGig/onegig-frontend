import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { Box, Button, Drawer, Group, NumberInput, Select, Textarea, TextInput, Title } from '@mantine/core';
import { useForm, hasLength, isInRange } from '@mantine/form';
import PropTypes from 'prop-types';
import { updateProject } from 'hooks/projects';

// ==============================|| PROJECTS ||============================== //

const ProjectEdit = ({ opened, setOpened, refetch, project }) => {
  const { mutate, isLoading } = useMutation(['updateProject'], (variables) => updateProject(variables), {
    onSuccess: () => {
      refetch();
      setOpened(false);
    }
  });

  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      price: 100,
      status: 'LEAD'
    },

    validate: {
      name: hasLength({ min: 2, max: 20 }, 'Name must be 2-20 characters long'),
      description: hasLength({ min: 5, max: 600 }, 'Name must be 5-600 characters long'),
      price: isInRange({ min: 10 }, 'Price  minimum is $10')
    }
  });

  useEffect(() => {
    form.setValues({
      name: project.name,
      description: project.description,
      price: project.price / 100,
      status: project.status
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  function handleSubmit(values) {
    const price = parseInt(values.price * 100);
    const variables = { projectId: project.projectId, name: values.name, description: values.description, price, status: values.status };
    return mutate({ variables });
  }

  return (
    <Drawer opened={opened} onClose={() => setOpened(false)} title="Register" padding="xl" size="xl" position="right">
      <Box component="form" maw={400} mx="auto" onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Title order={1}>Edit Project</Title>

        <TextInput label="Name" placeholder="Name" withAsterisk {...form.getInputProps('name')} />

        <Textarea
          label="Description"
          placeholder="Brief description of this gig..."
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

        <Select
          label="Status"
          placeholder="Pick project status"
          data={[
            { value: 'LEAD', label: 'Lead' },
            { value: 'CLIENTWAITING', label: 'Client Waiting for Response' },
            { value: 'REQUIREMENTS', label: 'Waiting for Client Requirements' },
            { value: 'ACTIVE', label: 'In Progress' },
            { value: 'INREVIEW', label: 'Under Review' },
            { value: 'REVISION', label: 'Revision Requested' },
            { value: 'COMPLETED', label: 'Completed' }
          ]}
          {...form.getInputProps('status')}
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
ProjectEdit.propTypes = {
  opened: PropTypes.bool,
  setOpened: PropTypes.func,
  refetch: PropTypes.func,
  project: PropTypes.object
};

export default ProjectEdit;
