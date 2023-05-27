import React, { useState, useEffect } from "react";
import { convertToRaw } from "draft-js";
import { Button, Container, Modal, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import { exportToPdf } from "./exportPdf";
import TextEditor from "./editor"
import { useMutation } from 'react-query';
import { showNotification, updateNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { uploadFile } from 'react-s3';
import PropTypes from "prop-types";
import { createTemplate, updateTemplate } from 'hooks/templates'

const config = {
  bucketName: 'onegig-uploads',
  region: 'us-east-1',
  accessKeyId: process.env.REACT_APP_AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_S3_SECRET_ACCESS_KEY
};

const wrapperStyle = {
  border: "1px solid #ccc",
  backgroundColor: "white",
  borderRadius: "4px",
  color: "black",
  width: "60vw",
  minHeight: "8.5in",
  padding: "26px",
  margin: "20px auto",
  boxShadow: "0px 2px 8px rgba(60, 64, 67, 0.3)",
  position: "relative",
  overflow: "auto",
};

const RichTextEditor = ({ title, description, template, userId, editorState, setEditorState, refetch, templateId }) => {
  const { mutate: createTemplateMutation, isLoading } = useMutation(['createTemplate'], (variables) => createTemplate(variables), {
    onSuccess: () => {
      refetch();
    }
  });
  const { mutate: updateTemplateMutation, isLoading: loadingUpdate } = useMutation(['updateTemplate'], (variables) => updateTemplate(variables), {
    onSuccess: () => {
      refetch();
    }
  });
  const [pdfUrl, setPdfUrl] = useState(null);
  const navigate = useNavigate();
  const [isModalOpened, setIsModalOpened] = useState(false)

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const handleUpload = (file) => {
    return new Promise((resolve, reject) => {
      uploadFile(file[0], config)
        .then((data) => {
          setPdfUrl(data.location);
          resolve(data.location);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  };
  const handleSave = () => {
    const variables = {
      templateId,
      title: title,
      description: description,
      content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
      fileUrl: pdfUrl,
      userId
    };
    if (template.templateId) {
       updateTemplateMutation({ variables });
     } else {
       createTemplateMutation({ variables });
    }
  }
  
  const handleExportAndUpload = async () => {
    const pdfFile = await exportToPdf();
      showNotification({
        id: 'load-data',
        loading: true,
        title: 'Saving your Template',
        message: 'Template will be saved in a few seconds, please wait...',
        autoClose: false,
        withCloseButton: false,
      });
    handleUpload([pdfFile]).then(() => {
      updateNotification({
        id: 'load-data',
        color: 'teal',
        title: 'Template Saved!',
        message: 'Congratulations! your template was saved succesfully, you can close this notification',
        icon: <IconCheck size="1rem" />,
        autoClose: 2000,
      });
    }).catch((error) => {
      console.error("Error during upload: ", error);
    });
  };

  const handleExport = async () => {
    const pdfFile = await exportToPdf();
    const pdf = URL.createObjectURL(pdfFile);
    window.open(pdf)
  };

  const handleClose = async () => {
  
    if(!pdfUrl){
      setIsModalOpened(true)
    } 
    else {
      navigate('/templates');
    }
  };

  useEffect(() => {
    if (pdfUrl) {
      handleSave();
    }
  }, [pdfUrl]);



  return (
    <>
      <Container>
        <div style={wrapperStyle}>
          <TextEditor
            editorState={editorState}
            onChange={handleEditorChange}
          />
        </div>
      </Container>
      <Button
        variant="outline"
        onClick={handleExport}
        style={{ marginLeft: 20 }}
      >
        Export to PDF
      </Button>
      <Button
       onClick={ handleExportAndUpload  }
       style={{ marginLeft: 20 }}
       loading={isLoading}
       >
        Save
      </Button>
      <Button
       color= 'teal'
       onClick={ handleClose  }
       style={{ marginLeft: 20 }}
       >
        Close
       </Button>
       <Modal
        h={400}
        mt={120}
        align={"center"}
        opened={isModalOpened}
        onClose={handleClose}
        title={'Are you sure you want to leave without saving?'}
      >
        <Button
          fullWidth
          mt={20}
          variant="outline"
          onClick={() => {
            setIsModalOpened(false)
            navigate('/templates');
          }}
        >
          Yes
        </Button>
        <Button
          fullWidth
          mt={20}
          variant="outline"
          color="red"
          onClick={() => {
            setIsModalOpened(false)
          }}
        >
          NO
        </Button>
        <Text size="xs" style={{ marginTop: "1.5rem", textAlign: "center" }}>
          WARNING: If you select Yes, your template will be deleted permanently, and there is no way to recover it.
        </Text>
      </Modal>
    </>

  );
};

export default RichTextEditor;

RichTextEditor.propTypes = {
  content: PropTypes.string,
  setContent: PropTypes.func.isRequired,
};

