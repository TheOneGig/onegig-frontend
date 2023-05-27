import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { ActionIcon, Box, Button, Drawer, Grid, Group, Input, Select, Text, Textarea, TextInput, Title, Tooltip } from '@mantine/core';
import { Dropzone, PDF_MIME_TYPE } from '@mantine/dropzone';
import { useForm, hasLength } from '@mantine/form';
import { uploadFile } from 'react-s3';
import { blobToFile } from "utils/blob";
import { showNotification } from '@mantine/notifications';
import PropTypes from 'prop-types';
import { DeleteOutlined, SendOutlined, UserOutlined } from '@ant-design/icons';
import { createContract } from 'hooks/contracts';
import SingleTemplateCard from './templateBoxCard';
import { IconCheck } from '@tabler/icons-react';
import PdfSign from 'pages/pdfSign'

const config = {
  bucketName: 'onegig-uploads',
  region: 'us-east-1',
  accessKeyId: process.env.REACT_APP_AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_S3_SECRET_ACCESS_KEY
};
// ==============================|| Contracts ||============================== //

const ContractCreate = ({ opened, setOpened, templates, userId, refetch, gigOptions }) => {
  const [selectedGig, setSelectedGig] = useState(null);
  const [signingPdf, setSigningPdf] = useState(false);
  const [recieverEmail, setRecieverEmail] = useState('');
  const [signedPdf, setSignedPdf] = useState(null)
  const [fileType, setFileType] = useState('template')
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
 
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(['createContract'], (variables) => createContract(variables), {
    onSuccess: () => {
      refetch();
      setOpened(false);
      setSelectedGig(null);
      setSigningPdf(false);
      setRecieverEmail('');
      setSignedPdf(false);
      setFileType('template');
      setFile(null);
      setFileError(false);
      showNotification({
        id: 'load-data',
        color: 'teal',
        title: 'Contract Saved!',
        message: 'Congratulations! your contract was saved succesfully, you can close this notification',
        icon: <IconCheck size="1rem" />,
        autoClose: 2000,
      });
      form.reset();
      
    },
  }
  );

  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      status: 'Pending',
    },

    validate: {
      name: hasLength({ min: 2, max: 25 }, 'Title must be 2-20 characters long'),
      description: hasLength({ min: 5, max: 600 }, 'Description must be 5-600 characters long'),
      }
    },
  );

  const handleUpload = async (file) => {
    uploadFile(file[0], config)
      .then((data) => setFile(data.location))
      .catch((err) => console.error(err));
  };

  const handlePdfSignComplete = async (file) => {
    const signedFile = await blobToFile(file);
    handleUpload([signedFile])
    setSignedPdf(selectedTemplate.templateId)
}

  function handleSubmit(values) {
    if (file) {
      setFileError(false);
      const variables = {
        name: values.name,
        description: values.description,
        gig: selectedGig,
        status: values.status,
        reciever: recieverEmail,
        userId,
        fileUrl: file
      }
      return mutate({ variables })
    } else {
      setFileError(true);
    }
  }

  return (
   <>
    <Drawer opened={opened} onClose={() => setOpened(false)} padding="xl" size="100%" position="right" sx={{ zIndex: 9999 }}>
    {!signingPdf ? (
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
              {...form.getInputProps('description')} />
            <Grid>

            </Grid>
            <Select
              label="Gig"
              placeholder="Pick a Gig"
              value={selectedGig}
              withAsterisk
              onChange={(selectedOption) => setSelectedGig(selectedOption)}
              data={
                gigOptions.length
                  ? gigOptions
                  : [{ value: 'no-gigs', label: 'No Gigs Found' }]
              } />

            <Tooltip label="Who will recieve the contract">
              <TextInput
                label="Reciever"
                withAsterisk
                placeholder="Enter Reciever's Email"
                value={recieverEmail}
                onChange={(e) => setRecieverEmail(e.target.value)}
                rightSection={<UserOutlined />} />
            </Tooltip>
          </Grid.Col>

          <Grid.Col span={6}>
            {fileType === 'template' ? (
              <>
                <Input.Wrapper label="Choose a Template" withAsterisk />
                <Grid
                  sx={{
                    marginTop: "10px",
                    height: '320px',
                    overflowY: 'scroll',
                  }}
                >
                  {
                    templates.map((template, index) => (
                      <Box key={index} 
                        sx={{ 
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                            width: '100%',
                            marginBottom: '20',
                            flexDirection: 'column'
                        }}
                      >
                       <SingleTemplateCard
                          template={template}
                          signedPdf={signedPdf}
                          selected={selectedTemplate === template}
                          onTemplateSelect={(template) => {
                            setSelectedTemplate(template);
                            setFile(template.fileUrl);
                        }}
                      />
                    </Box>
                    ))
                  }
                </Grid>
                <Button color="gray" mt={20} 
                  onClick={() => {
                    setFile(null)
                    setFileType('file')
                 }}>
                  Upload your own Contract
                </Button>
               {
                  file ? (
                  <Tooltip label="Edit your document">
                    <Button ml={30} onClick={() => setSigningPdf(true)} >
                      Sign Document
                    </Button>
                  </Tooltip>
                  ) : 
                  <Tooltip label="Lets make a template">
                    <Button ml={30} onClick={() => navigate("/templates")} >
                      Need a template?
                    </Button>
                  </Tooltip>
                }
              </>
            ) : (
              <>
                <>
                  <Input.Wrapper label="Upload Contract" withAsterisk />
                  {
                    file ? (
                      <div className="actions-area">
                       <ActionIcon  className="actions-icon">
                          <DeleteOutlined onClick={() => setFile()}
                            style={{ color: "red", fontSize: "20px", marginTo: '-10px'}} />
                        </ActionIcon>
                        <a href={file} style={{ fontSize: "18px", marginLeft: '10px'}} target="_blank" rel="noopener noreferrer">
                          View PDF
                        </a>
                      </div>
                    ) : (

                      <Dropzone
                        onDrop={(files) => {
                          handleUpload(files)}}
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
              </>
                <Button color="gray" mt={20} 
                 onClick={() => {
                  setFile(null)
                  setFileType('template')
                 }}
                >
                  Or choose a Template
                </Button>
                {
                  file ? (
                  <Tooltip label="Edit your document">
                    <Button ml={30} onClick={() => setSigningPdf(true)} >
                      Sign Document
                    </Button>
                  </Tooltip>
                  ) : null
                }
              </>
            )}
          </Grid.Col>
        </Grid>
        <Group position="right" mt="xl">
          <Button color="gray" onClick={() => setOpened(false)} loading={isLoading} >
            Cancel
          </Button>
          <Button type="submit" loading={isLoading} >
            Send <SendOutlined style={{ marginLeft: 5 }} />
          </Button>
        </Group>
      </Box>
       ) : (
        <div>
          <h1>PDF Sign Page</h1>
          <Grid
            sx={{
              overflowY: 'scroll',
              display: 'flex',
              height: '80vh',
              overflowX: 'hidden',
              justifyContent: 'center',
              }}
            >
            <PdfSign file={file} setFile={handlePdfSignComplete} setSigningPdf={setSigningPdf} />
        </Grid>
        </div>
      )}
    </Drawer>
  </>
 );
}

ContractCreate.propTypes = {
  userId: PropTypes.string,
  opened: PropTypes.bool,
  setOpened: PropTypes.func,
  setLoading: PropTypes.func,
  refetch: PropTypes.func
};

export default ContractCreate;



