import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { ActionIcon, Box, Button, Drawer, Grid, Group, Input, Select, Text, Textarea, TextInput, Title, Tooltip } from '@mantine/core';
import { Dropzone, PDF_MIME_TYPE } from '@mantine/dropzone';
import { useForm, hasLength, isEmail } from '@mantine/form';
import { uploadFile } from 'react-s3';
import PropTypes from 'prop-types';
import { DeleteOutlined, SendOutlined, UserOutlined } from '@ant-design/icons';
//import { getTemplates } from 'hooks/templates';
import { createContract } from 'hooks/contracts';
import { DatePicker } from '@mantine/dates';
import SingleTemplateCard from './templateBoxCard';

const config = {
  bucketName: 'onegig-uploads',
  region: 'us-east-1',
  accessKeyId: process.env.REACT_APP_AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_S3_SECRET_ACCESS_KEY
};
// ==============================|| Contracts ||============================== //

const ContractCreate = ({ opened, setOpened, userId, refetch, gigOptions }) => {
  const [selectedGig, setSelectedGig] = useState(null);
  const [fileType, setFileType] = useState('template');
  const [file, setFile] = useState();
  const [fileError, setFileError] = useState(false);
  const [start, setStart] = useState(new Date());
  const [expiration, setExpiration] = useState(new Date());
  //const [selectedTemplate, setSelectedTemplate] = useState(null);
  //const { data: templates } = useQuery(['templates'], () => getTemplates({ userId }));
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(['createContract'], (variables) => createContract(variables), {
    onSuccess: () => {
      refetch();
      setOpened(false);
    }
  });

  const dummyData = [
    { id: 1, name: 'Template 1', preview: 'https://dummyimage.com/300x200/000/fff' },
    { id: 2, name: 'Template 2', preview: 'https://dummyimage.com/300x200/000/fff' },
    { id: 3, name: 'Template 3', preview: 'https://dummyimage.com/300x200/000/fff' },
    { id: 4, name: 'Template 4', preview: 'https://dummyimage.com/300x200/000/fff' },
    { id: 5, name: 'Template 5', preview: 'https://dummyimage.com/300x200/000/fff' },
    { id: 6, name: 'Template 6', preview: 'https://dummyimage.com/300x200/000/fff' }
  ];

  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      recieverEmail: '',
      status: 'Pending'
    },

    validate: {
      name: hasLength({ min: 2, max: 20 }, 'Title must be 2-20 characters long'),
      description: hasLength({ min: 5, max: 600 }, 'Description must be 5-600 characters long'),
      recieverEmail: isEmail('Please enter a valid email')
    }
  });

  const handleUpload = async (file) => {
    uploadFile(file[0], config)
      .then((data) => setFile(data.location))
      .catch((err) => console.error(err));
  };

  function handleSubmit(values) {
    // if (file) {
    //   setFileError(false);
    // } else {
    //   setFileError(true);
    // }
    const variables = {
      name: values.name,
      description: values.description,
      gig: selectedGig,
      status: values.status,
      reciever: values.recieverEmail,
      userId,
      fileUrl: file && file,
      start,
      expiration
    };
    return mutate({ variables });
  }

  return (
    <Drawer opened={opened} onClose={() => setOpened(false)} padding="xl" size="100%" position="right" sx={{ zIndex: 9999999 }}>
      <Box component="form" onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Title order={1}>Create Contract</Title>
        <Grid>
          <Grid.Col span={6}>
            <TextInput label="Contract Name" placeholder="Name" withAsterisk {...form.getInputProps('name')} />
            <Textarea
              label="Description"
              placeholder="Brief description of this contract..."
              withAsterisk
              mt="md"
              {...form.getInputProps('description')}
            />
            {/* <Grid>
              <Grid.Col span={6}>
                <DatePicker label="Start Date" value={start} withAsterisk onChange={(date) => setStart(date)} />
              </Grid.Col>

              <Grid.Col span={6}>
                <DatePicker label="End Date" value={expiration} withAsterisk onChange={(date) => setExpiration(date)} />
              </Grid.Col>
            </Grid> */}
            <Select
              label="Gig"
              placeholder="Pick a Gig"
              value={selectedGig}
              withAsterisk
              onChange={setSelectedGig}
              data={gigOptions.length ? gigOptions : [{ value: 'no-gigs', label: 'No Gigs Found' }]}
            />

            <Tooltip label="Who will recieve the contract">
              <TextInput
                label="Reciever"
                withAsterisk
                placeholder="Enter Reciever's Email"
                {...form.getInputProps('recieverEmail')}
                rightSection={<UserOutlined />}
              />
            </Tooltip>
          </Grid.Col>

          <Grid.Col span={6}>
            {fileType === 'template' ? (
              <div>
                <Input.Wrapper label="Choose a Template" withAsterisk />
                <Grid
                  sx={{
                    marginTop: '10px',
                    height: '300px',
                    overflowY: 'scroll',
                    overflowX: 'hidden'
                  }}
                >
                  {dummyData.map((template) => (
                    <Box key={template.id} sx={{ cursor: 'pointer' }} maw={400} mx="auto" mb={20}>
                      <SingleTemplateCard
                        template={template}
                        onClick={() => setFile(template.preview)}
                        selected={file === template.preview}
                      />
                    </Box>
                  ))}
                </Grid>
                <Button color="gray" mt={20} onClick={() => setFileType('file')}>
                  Upload your own Contract
                </Button>
                <Tooltip label="Lets make a template">
                  <Button ml={30} onClick={() => navigate('/templates')}>
                    Need a template?
                  </Button>
                </Tooltip>
              </div>
            ) : (
              <>
                <div style={{ marginTop: '16px' }}>
                  <Input.Wrapper label="Upload Contract" withAsterisk />
                  {file ? (
                    <div className="actions-area">
                      <ActionIcon onClick={() => setFile()} className="actions-icon">
                        <DeleteOutlined style={{ color: 'red', marginTop: '-25px' }} />
                      </ActionIcon>
                      <a href={file} target="_blank" rel="noopener noreferrer">
                        View PDF
                      </a>
                    </div>
                  ) : (
                    <Dropzone
                      onDrop={(files) => handleUpload(files)}
                      onReject={() => alert('File rejected')}
                      maxSize={3 * 1024 ** 2}
                      accept={PDF_MIME_TYPE}
                    >
                      <Group position="center" spacing="xl" style={{ minHeight: 250, pointerEvents: 'none' }}>
                        <div>
                          <Text size="md" inline>
                            Drag or Upload Contract here or click to select file
                          </Text>
                        </div>
                      </Group>
                    </Dropzone>
                  )}
                  {fileError && <p style={{ color: 'red' }}>Featured file is required.</p>}
                </div>
                <Button color="gray" mt={20} onClick={() => setFileType('template')}>
                  Or choose a Template
                </Button>
              </>
            )}
          </Grid.Col>
        </Grid>
        <Group position="right" mt="md">
          <Button color="gray" onClick={() => setOpened(false)} loading={isLoading}>
            Cancel
          </Button>
          <Button type="submit" loading={isLoading}>
            Send <SendOutlined style={{ marginLeft: 5 }} />
          </Button>
        </Group>
      </Box>
    </Drawer>
  );
};

ContractCreate.propTypes = {
  userId: PropTypes.string,
  opened: PropTypes.bool,
  setOpened: PropTypes.func,
  setLoading: PropTypes.func,
  refetch: PropTypes.func,
  gigOptions: PropTypes.any
};

export default ContractCreate;
