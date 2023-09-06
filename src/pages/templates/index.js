import React from 'react';
import { Grid, Tooltip, Title, Box, Flex, Button } from '@mantine/core';
import SingleTemplateCard from './templateCard';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';
import useWorkspace from 'hooks/useWorkspace';
import { useQuery } from 'react-query';
import { getWorkspaceTemplates } from 'hooks/templates';

const TemplatesPage = () => {
  const { workspaceId } = useWorkspace();
  const navigate = useNavigate();
  const { data: templates, isLoading, refetch } = useQuery(['templates'], () => getWorkspaceTemplates({ workspaceId }));

  const handleCreateNewTemplate = () => {
    const newId = uuid();
    navigate(`/${workspaceId}/edittemplate/${newId}`);
  };

  if (isLoading) {
    return <div>Loading Templates...</div>;
  }

  return (
    <>
      <Flex gap="md" justify="center" align="flex-start" direction="column" wrap="wrap">
        <Tooltip
          label="Create a new Template"
          position="right"
          transition="fade"
          style={{
            borderRadius: 6,
            padding: '12px 16px',
            color: '#fff',
            backgroundColor: '#484848',
            fontSize: 12,
            transition: 0.3
          }}
        >
          <Button onClick={handleCreateNewTemplate} className="create-btn blue-btn" variant="light">
            New Template
          </Button>
        </Tooltip>
      </Flex>
      <Title>Created Templates</Title>
      <Grid justify="start" ml={1}>
        {templates.map((template, index) => (
          <Box key={index} mt={20} mr={30}>
            <SingleTemplateCard key={template.templateId} refetch={refetch} isLoading={isLoading} template={template} />
          </Box>
        ))}
      </Grid>
    </>
  );
};

export default TemplatesPage;
