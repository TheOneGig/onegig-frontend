import { useState } from 'react';
import { useMutation } from 'react-query';
import { Box, Button, Drawer, Group, Image, NumberInput, Text, Textarea, TextInput, Title } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useForm, hasLength, isInRange } from '@mantine/form';
import { createGig } from 'hooks/gigs';
import { uploadFile } from 'react-s3';
import PropTypes from 'prop-types';

const config = {
  bucketName: 'onegig-uploads',
  region: 'us-east-1',
  accessKeyId: process.env.REACT_APP_AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_S3_SECRET_ACCESS_KEY
};

// ==============================|| GIGS ||============================== //

const GigCreate = ({ opened, setOpened, refetch, userId }) => {
  const [file, setFile] = useState();
  const { mutate, isLoading } = useMutation(['createGig'], (variables) => createGig(variables), {
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

  const handleUpload = async (file) => {
    uploadFile(file[0], config)
      .then((data) => setFile(data.location))
      .catch((err) => console.error(err));
  };

  function handleSubmit(values) {
    const price = parseInt(values.price * 100);
    const variables = { name: values.name, description: values.description, price, userId, fileUrl: file };
    return mutate({ variables });
  }

  return (
    <Drawer opened={opened} onClose={() => setOpened(false)} title="Register" padding="xl" size="xl" position="right">
      <Box component="form" maw={400} mx="auto" onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Title order={1}>New Gig</Title>

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

        {file ? (
          <Image src={file} alt="featured" />
        ) : (
          <Dropzone
            onDrop={(files) => handleUpload(files)}
            onReject={() => alert('File rejected')}
            maxSize={3 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
          >
            <Group position="center" spacing="lg" style={{ minHeight: 100, pointerEvents: 'none' }}>
              <div>
                <Text size="xl" inline>
                  Drag image here or click to select file
                </Text>
              </div>
            </Group>
          </Dropzone>
        )}

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
GigCreate.propTypes = {
  userId: PropTypes.string,
  opened: PropTypes.bool,
  setOpened: PropTypes.func,
  refetch: PropTypes.func
};

export default GigCreate;
