import React, { useState, useEffect } from 'react';
import { Box, FormLabel, Grid, TextField, Typography, Button, Stack } from '@mui/material';
import { CameraOutlined } from '@ant-design/icons';
import useAuth from 'hooks/useAuth';
import { createWorkspace } from 'hooks/workspace';
import { useMutation } from 'react-query';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

import { createNotification } from 'hooks/notifications';
import { uploadFile } from 'react-s3';
import { useNavigate } from 'react-router-dom';
import Avatar from 'components/@extended/Avatar';

const config = {
  bucketName: 'onegig-uploads',
  region: 'us-east-1',
  accessKeyId: process.env.REACT_APP_AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_S3_SECRET_ACCESS_KEY,
};

const CreateWorkspaceForm = () => {
  const { user } = useAuth();
  console.log(user)
  const userId = user.id;
  const history = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const [icon, setIcon] = useState(null);
  const createNotificationMutation = useMutation(createNotification);

  const { mutate, isLoading } = useMutation(['createWorkspace'], (variables) => createWorkspace(variables), {
    onSuccess: (data) => {
      // Suponiendo que la ID del espacio de trabajo se devuelve como parte de la respuesta
      showNotification({
        id: 'load-data',
        color: 'teal',
        title: 'Workspace Created!',
        message: 'Congratulations! your Workspace was created successfully, you can close this notification',
        icon: <IconCheck size="1rem" />,
        autoClose: 3000
      });
      createNotificationMutation.mutate({
        variables: {
          userId: userId,
          message: 'Your Workspace has been created'
        }
      });
      setCompanyName('');
      setIcon(null);
      history('/new/profile/personal');
    }
  });

  const handleSave = (e) => {
    e.preventDefault();
    const variables = {
      userId: userId,
      companyName: companyName,
      fileUrl: icon
    };
    return mutate({ variables });
  };
  const handleUpload = async (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setIcon(reader.result);
    };
  
    if (file) {
      reader.readAsDataURL(file);
      showNotification({
        id: 'load-data',
        color: 'teal',
        title: 'Icon Uploading!',
        message: 'Your icon is uploading, please wait a moment',
        icon: <IconCheck size="1rem" />,
        autoClose: 3000
      });
      uploadFile(file, config)
      .then((data) =>  setIcon(data.location))
      .catch((err) => console.error(err));
    }
  
    
  };

  return (
    <>
    <form onSubmit={handleSave}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Company Name"
            variant='outlined'
            sx={{ fontSize: '28px'}}
            placeholder="Enter company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormLabel
            htmlFor="insert-icon"
            sx={{
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{fontSize: '20px'}} alt="Insert Icon" src={icon ? icon : 'default_image_url_here'} />
            <Box spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
              <CameraOutlined />
              <Typography>Upload Icon</Typography>
            </Box>
          </FormLabel>
          <TextField
            type="file"
            id="insert-icon"
            accept="image/*"
            sx={{ display: 'none' }}
            onChange={(e) => // Debug line
              handleUpload(e.target.files?.[0])
            } /> 
            
        </Grid>
        <Grid item xs={12}>
        <Stack justifyContent="center" alignItems="center">
          <Button  type="submit" fullWidth variant="contained" color="primary" disabled={isLoading}>
            Create Workspace
          </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  </>
);
};

export default CreateWorkspaceForm;
