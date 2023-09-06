import React, { useState } from 'react';
import { Card, Image, Text, Button, Modal, Divider } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useMutation } from 'react-query';
import { deleteTemplate } from 'hooks/templates';
import PropTypes from 'prop-types';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { useTheme } from '@mui/material/styles';
import { createNotification } from 'hooks/notifications';

const SingleTemplateCard = ({ template, refetch }) => {
  const theme = useTheme();
  const StyledCard = styled(Card)`
    margin-bottom: 1rem;
    width: 340px;
    height: 310px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      border: 1px solid #1dbeea;
    }
  `;

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [deleteSelected, setDeleteSelected] = useState(false);
  const navigate = useNavigate();
  const createNotificationMutation = useMutation(createNotification);
  const { mutate: mutationDeleteTemplate } = useMutation(['deleteTemplate'], (variables) => deleteTemplate(variables), {
    onSuccess: () => {
      refetch();
      showNotification({
        id: 'load-data',
        color: 'red',
        title: 'Template Deleted!',
        message: 'Your template was deleted succesfully, you can close this notification',
        icon: <IconCheck size="1rem" />,
        autoClose: 3000
      });
      createNotificationMutation.mutate({
        variables: {
          userId: userId,
          message: 'A template has been deleted'
        }
      });
    }
  });

  function handleDeleteClick() {
    const templateId = template.templateId;
    const variables = { templateId };
    return mutationDeleteTemplate({ variables });
  }

  const handleEditClick = () => {
    navigate(`/edittemplate/${template.templateId}`);
  };
  const handleCardClick = () => {
    setIsModalOpened(true);
  };

  const handleModalClose = () => {
    setIsModalOpened(false);
  };

  return (
    <StyledCard style={{}} onClick={handleCardClick}>
      <Divider sx={{ marginTop: 2, marginBottom: 10 }} />
      <div
        style={{
          border: '2px solid #484848',
          borderRadius: '8px',
          width: '300px',
          margin: '0 auto',
          height: '180px',
          overflow: 'hidden'
        }}
      >
        <Image src={template.thumbnail} alt={template.title} />
      </div>
      <Divider sx={{ marginTop: 10, marginBottom: 10 }} />
      <Text size="lg" weight={600} style={{ marginBottom: 2, textAlign: 'center' }}>
        {template.title}
      </Text>
      <Text size="sm" style={{ marginBottom: 2 }}>
        {template.description}
      </Text>
      <Modal
        opened={isModalOpened}
        onClose={handleModalClose}
        title={deleteSelected ? 'Delete Template?' : `${template.title} Actions`}
        overlayColor={theme.colors.dark[9]}
        overlayOpacity={0.55}
        overlayBlur={3}
        centered
      >
        {deleteSelected ? (
          <>
            <Button
              fullWidth
              mt={20}
              variant="light"
              color="red"
              onClick={() => {
                handleDeleteClick();
                handleModalClose();
              }}
            >
              Yes
            </Button>
            <Button
              fullWidth
              mt={20}
              variant="light"
              onClick={() => {
                setDeleteSelected(false);
              }}
            >
              No
            </Button>
            <Text style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              WARNING: If you select Yes your template will be deleted permanently.
            </Text>
          </>
        ) : (
          <>
            <Button fullWidth mt={20} className="blue-btn">
              <a href={template.fileUrl} style={{ textDecoration: 'none', color: 'inherit' }} target="_blank" rel="noopener noreferrer">
                View PDF
              </a>
            </Button>
            <Button
              fullWidth
              mt={20}
              className="blue-btn"
              onClick={() => {
                handleEditClick();
                handleModalClose();
              }}
            >
              Edit
            </Button>
            <Button
              fullWidth
              mt={20}
              className="red-btn"
              onClick={() => {
                setDeleteSelected(true);
              }}
            >
              Delete
            </Button>
          </>
        )}
      </Modal>
    </StyledCard>
  );
};

SingleTemplateCard.propTypes = {
  template: PropTypes.object,
  refetch: PropTypes.func
};

export default SingleTemplateCard;
