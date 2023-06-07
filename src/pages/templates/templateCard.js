import React, { useState } from 'react';
import { Card, Image, Text, Button, Modal } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useMutation } from 'react-query';
import { deleteTemplate } from 'hooks/templates';
import templateImg from '../../assets/images/icons/document-icon.png';
import PropTypes from 'prop-types';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { useMantineTheme } from '@mantine/core';

const StyledCard = styled(Card)`
    border-radius: 10px;
    margin-bottom: 1rem;
    padding: 1rem;
    width: 300px;
    border: 1px solid #484848;
    height: 300px;
    background-color: #1e1e1e;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      transform: scale(1.02);
    }

    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
  `;

const SingleTemplateCard = ({ template, refetch }) => {
  const theme = useMantineTheme();
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

  return (
    <StyledCard onClick={handleCardClick}>
      <Image
        style={{
          width: '150px',
          height: '150px',
          margin: '0 auto'
        }}
        src={templateImg}
        alt={template.title}
        fit="cover"
      />
      <Text size="lg" weight={700} style={{ marginTop: '1rem', textAlign: 'center' }}>
        {template.title}
      </Text>
      <Text size="sm" style={{ margin: '10px 0px 10px 10px' }}>
        {template.description}
      </Text>
      <Modal  
          opened={isModalOpened}
          onClose={handleModalClose}
          title={deleteSelected ? ("Delete Template?") : (`${template.title} Actions`)}
          overlayColor={theme.colors.dark[9]}
          overlayOpacity={0.55}
          overlayBlur={3}
          centered >
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
