import React, { useState } from "react";
import { Card, Image, Text, Button, Modal } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { useMutation } from "react-query";
import { deleteTemplate } from "hooks/templates";
import templateImg from "../../assets/images/icons/document-icon.png";

const StyledCard = styled(Card)`
    border-radius: 10px;
    margin-bottom: 1rem;
    padding: 1rem;
    width: 300px;
    border: 1px solid black;
    height: 300px;
    background-color: #1e1e1e
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      transform: scale(1.02);
    }

    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
  `;


const SingleTemplateCard = ({ template, refetch, isLoading }) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const navigate = useNavigate();
  const { mutate: mutationDeleteTemplate, isLoading: loadingDelete } = useMutation(
    ["deleteTemplate"],
    (variables) => deleteTemplate(variables),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  

  function handleDeleteClick() {
    const templateId = template.templateId
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
        <Image style={{
          width: "150px",
          height: "150px",
          margin: "0 auto",
      
      
        }} src={templateImg} alt={template.title} fit="cover" />
        <Text size="lg" weight={700} style={{ marginTop: "1rem", textAlign: "center" }}>
          {template.title}
        </Text>
        <Text size="sm" style={{ margin: "10px 0px 10px 10px" }}>
          {template.description}
        </Text>
      <Modal
        h={400}
        mt={120}
        align={"center"}
        opened={isModalOpened}
        onClose={handleModalClose}
        title={template.title}
      >
        <Button
          fullWidth
          mt={20}
          variant="outline"

        >
         <a href={template.fileUrl}  style={{ textDecoration: 'none', color: 'inherit' }} target="_blank" rel="noopener noreferrer">
            View PDF
        </a>
        </Button>
        <Button
          fullWidth
          mt={20}
          variant="outline"
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
          variant="outline"
          color="red"
          onClick={() => {
            handleDeleteClick();
            handleModalClose();
          }}
        >
          Delete
        </Button>
        <Text size="xs" style={{ marginTop: "1.5rem", textAlign: "center" }}>
          WARNING: If you select delete, your template will be deleted permanently, and there is no way to recover it.
        </Text>
      </Modal>
    </StyledCard>
  );
};

export default SingleTemplateCard;
