import { useState } from 'react';
import { useMutation } from 'react-query';
import {
  ActionIcon,
  Box,
  Button,
  Drawer,
  Grid,
  Group,
  Image,
  Input,
  NumberInput,
  Select,
  Text,
  Textarea,
  TextInput,
  Title,
  Tooltip
} from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useForm, hasLength, isInRange } from '@mantine/form';
import { createGig } from 'hooks/gigs';
import { uploadFile } from 'react-s3';
import PropTypes from 'prop-types';
import { IconEdit, IconCheck } from '@tabler/icons-react';
import IconButton from 'components/@extended/IconButton';
import { CheckCircleOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { showNotification } from '@mantine/notifications';
import { createNotification } from 'hooks/notifications';

const config = {
  bucketName: 'onegig-uploads',
  region: 'us-east-1',
  accessKeyId: process.env.REACT_APP_AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_S3_SECRET_ACCESS_KEY
};

// ==============================|| GIGS ||============================== //

const GigCreate = ({ opened, setOpened, refetch, userId, workspaceId }) => {
  const createNotificationMutation = useMutation(createNotification);
  const [category, setCategory] = useState(null);
  const [deliverables, setDeliverables] = useState([]);
  const [newDeliverable, setNewDeliverable] = useState('');
  const [openNewDeliverable, setOpenNewDeliverable] = useState(false);
  const [file, setFile] = useState();
  const [fileError, setFileError] = useState(false);
  const { mutate, isLoading } = useMutation(['createGig'], (variables) => createGig(variables), {
    onSuccess: () => {
      refetch();
      setOpened(false);
      showNotification({
        id: 'load-data',
        color: 'teal',
        title: 'Gig Created!',
        message: 'Congratulations! your gig was created succesfully, you can close this notification',
        icon: <IconCheck size="1rem" />,
        autoClose: 3000
      });
      createNotificationMutation.mutate({
        variables: {
          userId: userId,
          message: 'You have created a new gig!'
        }
      });
      form.reset();
      setFile();
      setCategory(null);
      setOpenNewDeliverable(false);
      setDeliverables([]);
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
      description: hasLength({ min: 5, max: 600 }, 'Name must be 5-600 characters long'),
      price: isInRange({ min: 10 }, 'Price  minimum is $10'),
      delivery: isInRange({ min: 1 }, 'Delivery minimum is 1')
    }
  });

  const handleUpload = async (file) => {
    uploadFile(file[0], config)
      .then((data) => setFile(data.location))
      .catch((err) => console.error(err));
  };

  function handleSubmit(values) {
    if (file) {
      setFileError(false);
      const price = parseInt(values.price * 100);
      const variables = {
        name: values.name,
        description: values.description,
        delivery: values.delivery,
        price,
        category,
        deliverables: deliverables.join(),
        userId,
        fileUrl: file,
        workspaceId
      };
      return mutate({ variables });
    } else {
      setFileError(true);
    }
  }

  function handleNewDeliverable() {
    const newDeliverables = deliverables;
    newDeliverables.push(newDeliverable);
    setDeliverables(newDeliverables);
    setNewDeliverable('');
    setOpenNewDeliverable(false);
  }

  return (
    <Drawer opened={opened} onClose={() => setOpened(false)} padding="xl" size="100%" position="right" sx={{ zIndex: 9999 }}>
      <Box component="form" onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Title order={1}>New Proposoal</Title>

        <Grid>
          <Grid.Col span={6}>
            <TextInput label="Project Title" placeholder="Name" withAsterisk {...form.getInputProps('name')} />

            <Textarea
              label="Description"
              placeholder="Brief description of this Proposal..."
              withAsterisk
              mt="md"
              {...form.getInputProps('description')}
            />
            <Grid>
              <Grid.Col span={6}>
                <NumberInput
                  label="Price"
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  formatter={(value) => (!Number.isNaN(parseFloat(value)) ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '$ ')}
                  min={10}
                  {...form.getInputProps('price')}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <NumberInput
                  label="Average Delivery in Days"
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  min={1}
                  {...form.getInputProps('delivery')}
                />
              </Grid.Col>
            </Grid>

            <Select
              label="Category"
              placeholder="Pick a category"
              value={category}
              onChange={setCategory}
              data={[
                { value: 'GRAPHICSDESIGN', label: 'Graphics & Design' },
                { value: 'DIGITALMARKETING', label: 'Digital & Marketing' },
                { value: 'WRITINGTRANSLATION', label: 'Writing & Translation' },
                { value: 'VIDEOANIMATION', label: 'Video & Animation' },
                { value: 'MUSICAUDIO', label: 'Music & Audio' },
                { value: 'PROGRAMMINGTECH', label: 'Programming & Tech' },
                { value: 'BUSINESS', label: 'Business' },
                { value: 'LIFESTYLE', label: 'Lifestyle' },
                { value: 'PHOTOEDITING', label: 'Photo & Editing' }
              ]}
            />

            <Title sx={{ fontSize: '14px !important', fontWeight: '500', marginTop: '10px' }}>
              Deliverables{' '}
              <Tooltip label="New Deliverable">
                <IconButton onClick={() => setOpenNewDeliverable(!openNewDeliverable)}>
                  <PlusCircleOutlined />
                </IconButton>
              </Tooltip>
            </Title>
            {deliverables.map((deliverable, index) => (
              <div key={index}>
                <CheckCircleOutlined /> {deliverable}
              </div>
            ))}
            {openNewDeliverable && (
              <Box>
                <TextInput
                  placeholder="Deliverable"
                  value={newDeliverable}
                  onChange={(e) => setNewDeliverable(e.target.value)}
                  rightSection={
                    <Button onClick={() => handleNewDeliverable()} variant="light" color="teal" className="right-section-btn">
                      <PlusOutlined />
                    </Button>
                  }
                />
              </Box>
            )}
          </Grid.Col>
          <Grid.Col span={6}>
            <div style={{ marginTop: '16px' }}>
              <Input.Wrapper label="Featured Image" withAsterisk />
              {file ? (
                <div className="actions-area">
                  <ActionIcon onClick={() => setFile()} className="actions-icon">
                    <IconEdit color="white" />
                  </ActionIcon>
                  <Image src={file} alt="featured" style={{ width: '300px', height: 'auto', margin: '0 auto' }} />
                </div>
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
              {fileError && <p style={{ color: 'red' }}>Featured file is required.</p>}
            </div>
          </Grid.Col>
        </Grid>

        <Group position="right" mt="md">
          <Button color="gray" onClick={() => setOpened(false)} loading={isLoading}>
            Cancel
          </Button>
          <Button type="submit" loading={isLoading}>
            Create
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
