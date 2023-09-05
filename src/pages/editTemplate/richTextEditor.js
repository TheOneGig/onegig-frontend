import React, { useState, useEffect, useCallback } from 'react';
import { convertToRaw } from 'draft-js';
import { Button, Container, Modal, Text } from '@mantine/core';
import { useNavigate } from 'react-router';
import { exportToPdf, generateThumbnail } from './exportPdf';
import TextEditor from './editor';
import { useMutation } from 'react-query';
import { showNotification, updateNotification } from '@mantine/notifications';
import { createNotification } from 'hooks/notifications';
import { IconCheck } from '@tabler/icons-react';
import { uploadFile } from 'react-s3';
import PropTypes from 'prop-types';
import { createTemplate, updateTemplate } from 'hooks/templates';

const config = {
  bucketName: 'onegig-uploads',
  region: 'us-east-1',
  accessKeyId: process.env.REACT_APP_AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_S3_SECRET_ACCESS_KEY
};

const wrapperStyle = {
  backgroundColor: 'white',
  borderRadius: 4,
  color: 'black',
  minHeight: '90vh',
  padding: '26px',
  margin: '20px auto'
};

const RichTextEditor = ({ title, description, template, userId, editorState, setEditorState, refetch, workspaceId,  templateId }) => {
  const createNotificationMutation = useMutation(createNotification);
  const { mutate: createTemplateMutation, isLoading } = useMutation(['createTemplate'], (variables) => createTemplate(variables), {
    onSuccess: () => {
      updateNotification({
        id: 'load-data',
        color: 'teal',
        title: 'Template Saved!',
        message: 'Congratulations! your template was saved successfully, you can close this notification',
        icon: <IconCheck size="1rem" />,
        autoClose: 3000
      });
      createNotificationMutation.mutate({
        variables: {
          userId: userId,
          message: 'You have created a new template!'
        }
      });
      refetch();
    }
  });
  const { mutate: updateTemplateMutation } = useMutation(['updateTemplate'], (variables) => updateTemplate(variables), {
    onSuccess: () => {
      updateNotification({
        id: 'load-data',
        color: 'teal',
        title: 'Template Updated!',
        message: 'Congratulations! your template was saved successfully, you can close this notification',
        icon: <IconCheck size="1rem" />,
        autoClose: 3000
      });
      createNotificationMutation.mutate({
        variables: {
          userId: userId,
          message: 'A template has been updated!'
        }
      });
      refetch();
    }
  });
  const [pdfUrl, setPdfUrl] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const navigate = useNavigate();
  const [isModalOpened, setIsModalOpened] = useState(false);

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const handleUpload = useCallback(async (file) => {
    try {
      const data = await uploadFile(file[0], config);
      return data.location;
    } catch (err) {
      console.error(err);
      showNotification({ title: 'Upload error', message: 'Failed to upload the file.', color: 'red' });
    }
  }, []);

  const handleExportAndUpload = async () => {
    try {
      const pdfFile = await exportToPdf(templateId);
      showNotification({
        id: 'load-data',
        loading: true,
        title: 'Saving your Template',
        message: 'Template will be saved in a few seconds, please wait...',
        autoClose: false,
        withCloseButton: false
      });
      const pdfUrl = await handleUpload([pdfFile]);
      setPdfUrl(pdfUrl);

      const thumbnailBlob = await generateThumbnail(templateId);
      const thumbnailUrl = await handleUpload([thumbnailBlob]);
      setThumbnail(thumbnailUrl);
    } catch (error) {
      console.error('Error during upload: ', error);
    }
  };

  const handleExport = async () => {
    const pdfFile = await exportToPdf();
    const pdf = URL.createObjectURL(pdfFile);
    window.open(pdf);
  };

  const handleClose = async () => {
    if (!pdfUrl) {
      setIsModalOpened(true);
    } else {
      navigate('/templates');
    }
  };

  const handleSave = useCallback(() => {
    if (template.templateId) {
      const newVariables = {
        templateId,
        title: title,
        description: description,
        content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
        fileUrl: pdfUrl,
        thumbnail: thumbnail,
      };
      updateTemplateMutation({ newVariables });
    } else {
      const variables = {
        templateId,
        title: title,
        description: description,
        content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
        fileUrl: pdfUrl,
        thumbnail: thumbnail,
        userId,
        workspaceId
      };
      createTemplateMutation({ variables });
    }
  }, [
    template.templateId,
    templateId,
    title,
    description,
    editorState,
    pdfUrl,
    thumbnail,
    userId,
    createTemplateMutation,
    updateTemplateMutation
  ]);

  useEffect(() => {
    if (thumbnail) {
      handleSave();
    }
  }, [pdfUrl, thumbnail, handleSave]);

  return (
    <>
      <Container>
        <div style={wrapperStyle}>
          <TextEditor editorState={editorState} onChange={handleEditorChange} />
        </div>
      </Container>
      <Button variant="light" onClick={handleExport} style={{ marginLeft: 20 }}>
        Export to PDF
      </Button>
      <Button variant="light" color="green" onClick={handleExportAndUpload} style={{ marginLeft: 20 }} loading={isLoading}>
        Save
      </Button>
      <Button variant="light" onClick={handleClose} style={{ marginLeft: 20 }}>
        Close
      </Button>
      <Modal
        h={400}
        mt={120}
        align={'center'}
        opened={isModalOpened}
        onClose={handleClose}
        title={'Are you sure you want to leave without saving?'}
      >
        <Button
          fullWidth
          mt={20}
          variant="light"
          onClick={() => {
            setIsModalOpened(false);
            navigate('/templates');
          }}
        >
          Yes
        </Button>
        <Button
          fullWidth
          mt={20}
          variant="light"
          color="red"
          onClick={() => {
            setIsModalOpened(false);
          }}
        >
          NO
        </Button>
        <Text size="xs" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          WARNING: If you select Yes, your template will be deleted permanently, and there is no way to recover it.
        </Text>
      </Modal>
    </>
  );
};

RichTextEditor.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  template: PropTypes.object,
  userId: PropTypes.string,
  editorState: PropTypes.object,
  setEditorState: PropTypes.func,
  refetch: PropTypes.func,
  templateId: PropTypes.string
};

export default RichTextEditor;
