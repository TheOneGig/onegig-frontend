import { useState, useEffect, useReducer } from 'react';
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
  Modal,
  NumberInput,
  Select,
  Text,
  Textarea,
  TextInput,
  Title,
  Tooltip,
  useMantineTheme
} from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useForm, hasLength, isInRange } from '@mantine/form';
import { updateGig } from 'hooks/gigs';
import { uploadFile } from 'react-s3';
import PropTypes from 'prop-types';
import { IconEdit } from '@tabler/icons-react';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import IconButton from 'components/@extended/IconButton';
import { createRequirement, deleteRequirement, updateRequirement } from 'hooks/requirements';

const config = {
  bucketName: 'onegig-uploads',
  region: 'us-east-1',
  accessKeyId: process.env.REACT_APP_AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_S3_SECRET_ACCESS_KEY
};

// ==============================|| GIGS ||============================== //

const GigEdit = ({ opened, setOpened, refetch, gigId, gigs }) => {
  const theme = useMantineTheme();
  const gig = gigs.find((gig) => gig.gigId === gigId);
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  const [category, setCategory] = useState(null);
  const [deliverables, setDeliverables] = useState([]);
  const [newDeliverable, setNewDeliverable] = useState('');
  const [openNewDeliverable, setOpenNewDeliverable] = useState(false);
  const [file, setFile] = useState();
  const [fileError, setFileError] = useState(false);
  const [openedNewReq, setOpenNewReq] = useState(false);
  const [newReq, setNewReq] = useState('');
  const [openedDelete, setOpenedDelete] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [editId, setEditId] = useState('');
  const [editName, setEditName] = useState('');
  const { mutate, isLoading } = useMutation(['updateGig'], (variables) => updateGig(variables), {
    onSuccess: () => {
      refetch();
      setOpened(false);
    }
  });

  const { mutate: newRequirement } = useMutation(['newRequirement'], (variables) => createRequirement(variables), {
    onSuccess: () => {
      refetch();
      setOpenNewReq(false);
      setNewReq('');
    }
  });

  const { mutate: deleteReq, loading: loadingDelete } = useMutation(['deleteRequirement'], (variables) => deleteRequirement(variables), {
    onSuccess: () => {
      refetch();
      setDeleteId('');
      setOpenedDelete(false);
    }
  });

  const { mutate: editRequirement } = useMutation(['editRequirement'], (variables) => updateRequirement(variables), {
    onSuccess: () => {
      refetch();
      setEditId('');
      setEditName('');
    }
  });

  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      price: 100,
      delivery: 1
    },

    validate: {
      name: hasLength({ min: 2, max: 20 }, 'Name must be 2-20 characters long'),
      description: hasLength({ min: 5, max: 600 }, 'Name must be 5-600 characters long'),
      price: isInRange({ min: 10 }, 'Price  minimum is $10'),
      delivery: isInRange({ min: 1 }, 'Delivery minimum is 1')
    }
  });

  useEffect(() => {
    setFile(gig.files[0]?.fileUrl);
    setCategory(gig.category && gig.category);
    setDeliverables(gig.deliverables ? gig.deliverables?.split(',') : []);
    form.setValues({
      name: gig.name,
      description: gig.description,
      price: gig.price / 100,
      delivery: gig.delivery
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gig]);

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
        price,
        category,
        deliverables: deliverables.join(),
        delivery: values.delivery,
        gigId: gig.gigId,
        fileUrl: file
      };
      return mutate({ variables });
    } else {
      setFileError(true);
    }
  }

  function handleNewRequirement() {
    const variables = { gigId: gig.gigId, requirement: newReq, type: 'OPEN' };
    return newRequirement({ variables });
  }

  function handleDelete() {
    const variables = { requirementId: deleteId };
    return deleteReq({ variables });
  }

  function handleEdit() {
    const variables = { requirementId: editId, requirement: editName };
    return editRequirement({ variables });
  }

  function handleNewDeliverable() {
    const newDeliverables = deliverables;
    newDeliverables.push(newDeliverable);
    setDeliverables(newDeliverables);
    setNewDeliverable('');
    setOpenNewDeliverable(false);
  }

  function handleDeleteDeliverable(index) {
    const newDeliverables = deliverables;
    newDeliverables.splice(index, 1);
    setDeliverables(newDeliverables);
    forceUpdate();
  }

  console.log('_:', _);

  return (
    <Drawer opened={opened} onClose={() => setOpened(false)} padding="xl" size="100%" position="right" sx={{ zIndex: 9999 }}>
      <Box component="form" onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Title order={1}>Edit Gig</Title>

        <Grid>
          <Grid.Col span={6}>
            <TextInput label="Name" placeholder="Name" withAsterisk {...form.getInputProps('name')} />

            <Textarea
              label="Description"
              placeholder="Brief description of this gig..."
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
                  {...form.getInputProps('price')}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <NumberInput
                  label="Average Delivery in Days"
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
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
                <IconButton className="delete-btn" onClick={() => handleDeleteDeliverable(index)}>
                  <DeleteOutlined />
                </IconButton>{' '}
                {deliverable}
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
                  <Image src={file} alt="featured" />
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
          <Grid.Col span={12}>
            <Title sx={{ fontSize: '14px !important', fontWeight: '500', marginTop: '10px' }}>
              Gig Requirements{' '}
              <Tooltip title="New Requirement">
                <IconButton onClick={() => setOpenNewReq(!openedNewReq)}>
                  <PlusCircleOutlined />
                </IconButton>
              </Tooltip>
            </Title>
            {gig.requirements?.map((requirement, index) => {
              if (editId && editId === requirement.requirementId) {
                return (
                  <Box key={requirement.requirementId}>
                    <p>
                      <TextInput
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="Requirement"
                        rightSection={
                          <Button variant="light" color="teal" className="right-section-btn" onClick={() => handleEdit()}>
                            <PlusOutlined />
                          </Button>
                        }
                      />
                    </p>
                  </Box>
                );
              } else {
                return (
                  <Box key={requirement.requirementId}>
                    <p>
                      <Tooltip label="Edit">
                        <IconButton
                          className="edit-btn"
                          onClick={() => {
                            setEditId(requirement.requirementId);
                            setEditName(requirement.requirement);
                          }}
                        >
                          <EditOutlined />
                        </IconButton>
                      </Tooltip>
                      <Tooltip label="Delete">
                        <IconButton
                          className="delete-btn"
                          onClick={() => {
                            setDeleteId(requirement.requirementId);
                            setOpenedDelete(true);
                          }}
                        >
                          <DeleteOutlined />
                        </IconButton>
                      </Tooltip>
                      {index + 1}
                      {') '}
                      {requirement.requirement}
                    </p>
                  </Box>
                );
              }
            })}
            {openedNewReq && (
              <Box>
                <TextInput
                  placeholder="Requirement"
                  value={newReq}
                  onChange={(e) => setNewReq(e.target.value)}
                  rightSection={
                    <Button onClick={(e) => handleNewRequirement(e)} variant="light" color="teal" className="right-section-btn">
                      <PlusOutlined />
                    </Button>
                  }
                />
              </Box>
            )}
          </Grid.Col>
        </Grid>

        <Group position="right" mt="md">
          <Button color="gray" onClick={() => setOpened(false)} loading={isLoading}>
            Cancel
          </Button>
          <Button type="submit" loading={isLoading}>
            Save
          </Button>
        </Group>
      </Box>

      <Modal
        opened={openedDelete}
        onClose={() => setOpenedDelete(false)}
        title="Delete Requirement?"
        overlayColor={theme.colors.dark[9]}
        overlayOpacity={0.55}
        overlayBlur={3}
        centered
      >
        <div>
          <p>Are you sure you want to delete this Requirement? This is irreversible!</p>
          <Grid>
            <Grid.Col span={6}>
              <Button
                variant="light"
                color="default"
                mt="md"
                radius="md"
                fullWidth
                onClick={() => setOpenedDelete(false)}
                loading={loadingDelete}
              >
                Cancel
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button variant="light" color="red" mt="md" radius="md" fullWidth onClick={() => handleDelete()} loading={loadingDelete}>
                Yes, I am sure!
              </Button>
            </Grid.Col>
          </Grid>
        </div>
      </Modal>
    </Drawer>
  );
};
GigEdit.propTypes = {
  opened: PropTypes.bool,
  setOpened: PropTypes.func,
  refetch: PropTypes.func,
  gigId: PropTypes.string,
  gigs: PropTypes.array
};

export default GigEdit;
