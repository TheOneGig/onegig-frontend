import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router';
import { Box, Button, Grid, Group, Modal, Text, Title, useMantineTheme, Tooltip, Anchor } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import IconButton from 'components/@extended/IconButton';
import { DeleteOutlined } from '@ant-design/icons';
import { addFile, deleteFile, getProject } from 'hooks/projects';
import { uploadFile } from 'react-s3';
import { isImage } from 'utils/isImage';
import { isVideo } from 'utils/isVideo';
import PDFIcon from 'assets/images/icons/pdf-icon.png';
import VideoIcon from 'assets/images/icons/video-icon.png';

const config = {
  bucketName: 'onegig-uploads',
  region: 'us-east-1',
  accessKeyId: process.env.REACT_APP_AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_S3_SECRET_ACCESS_KEY
};

// ==============================|| RESOURCES ||============================== //

const Resources = () => {
  const theme = useMantineTheme();
  const [uploading, setUploading] = useState(false);
  const [openedDelete, setOpenedDelete] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const { projectId } = useParams();
  const { data: project, isLoading: loadingProject, refetch } = useQuery(['project'], () => getProject({ projectId }));
  const { mutate: fileCreate } = useMutation(['addFile'], (variables) => addFile(variables), {
    onSuccess: () => {
      refetch();
      setUploading(false);
    },
    onError: (error) => {
      console.error(error);
    }
  });
  const { mutate: fileDelete, isLoading: loadingDelete } = useMutation(['deleteFile'], (variables) => deleteFile(variables), {
    onSuccess: () => {
      refetch();
      setOpenedDelete(false);
    }
  });

  function handleDelete() {
    const variables = { fileId: deleteId };
    return fileDelete({ variables });
  }

  if (loadingProject) {
    return <div>Loading Resources...</div>;
  }

  const files = project.files;

  const handleUpload = async (file) => {
    setUploading(true);
    uploadFile(file[0], config)
      .then((data) => handleSubmit(data.location))
      .catch((err) => console.error(err));
  };

  function handleSubmit(fileUrl) {
    const variables = {
      fileUrl,
      projectId
    };
    return fileCreate({ variables });
  }

  return (
    <>
      <Title>Resources for {project.name}</Title>
      <Dropzone onDrop={(files) => handleUpload(files)} onReject={() => alert('File rejected')} loading={uploading}>
        <Group position="center" spacing="lg" style={{ minHeight: 100, pointerEvents: 'none' }}>
          <div>
            <Text size="xl" inline>
              Drag image here or click to select file
            </Text>
          </div>
        </Group>
      </Dropzone>
      <div className="task-tables-container">
        <Grid>
          {files &&
            files.map((file) => {
              const fileUrl = file.fileUrl;
              const fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
              const fileExtension = fileName.split('.').pop();
              const fileIsImage = isImage(fileExtension);
              const fileIsVideo = isVideo(fileExtension);
              const fileIsPdf = fileExtension === 'pdf';
              return (
                <Grid.Col key={file.fileId} span={3}>
                  <Anchor href={fileUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#fff' }}>
                    <div className="file-container">
                      <div className="file-name">{fileName}</div>
                      {fileIsImage ? (
                        <img className="file-image" src={fileUrl} alt={fileName} />
                      ) : fileIsPdf ? (
                        <img className="file-image" src={PDFIcon} alt={fileName} />
                      ) : (
                        fileIsVideo && <img className="file-image" src={VideoIcon} alt={fileName} />
                      )}
                      <Box
                        sx={{
                          position: 'absolute',
                          right: 5,
                          top: 5
                        }}
                      >
                        <Tooltip label="Delete">
                          <IconButton
                            className="delete-btn"
                            onClick={(e) => {
                              e.preventDefault();
                              setDeleteId(file.fileId);
                              setOpenedDelete(true);
                            }}
                          >
                            <DeleteOutlined />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </div>
                  </Anchor>
                </Grid.Col>
              );
            })}
        </Grid>
      </div>

      <Modal
        opened={openedDelete}
        onClose={() => setOpenedDelete(false)}
        title="Delete Resource?"
        overlayColor={theme.colors.dark[9]}
        overlayOpacity={0.55}
        overlayBlur={3}
        centered
      >
        <div>
          <p>Are you sure you want to delete this Resource? You will lose all the task in it and this is irreversible!</p>
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
              <Button className="red-btn" mt="md" radius="md" fullWidth onClick={() => handleDelete()} loading={loadingDelete}>
                Yes, I am sure!
              </Button>
            </Grid.Col>
          </Grid>
        </div>
      </Modal>
    </>
  );
};

export default Resources;
