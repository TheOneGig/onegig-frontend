import React, { useState } from "react";
import { Card, Image, Text, Button, Modal } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { useMutation } from "react-query";
import { deleteTemplate } from "hooks/templates";

const StyledCard = styled(Card)`
    border-radius: 10px;
    margin-bottom: 1rem;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      transform: scale(1.05);
    }

    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
  `;
const SingleTemplateCard = ({ template, refetch, isLoading }) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const navigate = useNavigate();
  const { mutate: deleteTemplate, isLoading: loadingDelete } = useMutation(
    ["deleteTemplate"],
    (variables) => deleteTemplate(variables),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  function handleDeleteClick(templateId) {
    const variables = { templateId };
    return mutate({ variables });
  }

  const templateData = template || { title: "Unnamed", description: "" };

  const handleEditClick = () => {
    navigate(`/edittemplate/${templateData.id}`);
  };

  const handleDownloadClick = async () => {
    await generatePdf(templateData.content);
    if (pdfUrl) {
      window.open(pdfUrl);
    }
  };

  const handleCardClick = () => {
    setIsModalOpened(true);
  };

  const handleModalClose = () => {
    setIsModalOpened(false);
  };

  

  return (
    <>
      <StyledCard onClick={handleCardClick}>
        <Image src={templateData.preview} alt={templateData.name} fit="cover" />
        <Text size="lg" weight={700} style={{ marginTop: "1rem", textAlign: "center" }}>
          {templateData.title}
        </Text>
        <Text size="sm" style={{ margin: "10px 0px 10px 10px" }}>
          {templateData.description}
        </Text>
      </StyledCard>
      <Modal
        h={400}
        mt={250}
        align={"center"}
        opened={isModalOpened}
        onClose={handleModalClose}
        title={templateData.title}
      >
        <Button
          fullWidth
          mt={20}
          variant="outline"
          color="blue"
          onClick={() => {
            handleDownloadClick();
          }}
        >
          Download File
        </Button>
        <Button
          fullWidth
          mt={20}
          variant="outline"
          color="blue"
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
    </>
  );
};

export default SingleTemplateCard;
