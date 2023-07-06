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

const SingleTemplateCard = ({ template, refetch }) => {
  const theme = useTheme();
  const StyledCard = styled(Card)`
    margin-bottom: 1rem;
    width: 340px;
    height: 310px;
    border: 1px solid #484848;
    cursor: pointer;
    opacity: 0.8;
    transition: all 0.3s ease-in-out;
    background-color: ${theme.palette.background.paper};

    &:hover {
      border: 1px solid #0eba9b;
    }
  `;

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [deleteSelected, setDeleteSelected] = useState(false);
  const navigate = useNavigate();
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

  console.log(template.thumbnail);

  return (
    <StyledCard onClick={handleCardClick}>
      <Divider sx={{ marginTop: 2, marginBottom: 10 }} />
      <div
        style={{
          border: '1px solid #055043',
          borderRadius: '6px',
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
              WARNING: If you select Yes your template will be deleted permanently, and there is no way to recover it.
            </Text>
          </>
        ) : (
          <>
            <Button fullWidth mt={20} variant="light">
              <a href={template.fileUrl} style={{ textDecoration: 'none', color: 'inherit' }} target="_blank" rel="noopener noreferrer">
                View PDF
              </a>
            </Button>
            <Button
              fullWidth
              mt={20}
              variant="light"
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
              variant="light"
              color="red"
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
