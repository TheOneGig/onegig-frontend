import React from 'react';
import { Grid, Tooltip, Title, Box, Flex, Button } from '@mantine/core';
import SingleTemplateCard from './templateCard';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import { useQuery } from 'react-query';
import { getTemplates } from 'hooks/templates';

const TemplatesPage = () => {
  const { user } = useAuth();
  const userId = user.id;
  const navigate = useNavigate();
  const { data: templates, isLoading, refetch } = useQuery(['templates'], () => getTemplates({ userId }));

  const handleCreateNewTemplate = () => {
    const newId = uuid();
    navigate(`/edittemplate/${newId}`);
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
            backgroundColor: '#3333',
            borderRadius: 6,
            padding: '12px 16px',
            color: '#fff',
            fontSize: 12,
            transition: 0.3
          }}
        >
          <Button onClick={handleCreateNewTemplate} className="create-btn blue-btn" variant="light">
            New Template
          </Button>
        </Tooltip>
      </Flex>
      <Title>Templates Created</Title>
      <Grid justify="start" ml={1}>
        {templates.map((template, index) => (
          <Box key={index} mt={20} mr={40} >
            <SingleTemplateCard refetch={refetch} template={template} />
          </Box>
        ))}
      </Grid>
    </>
  );
};

export default TemplatesPage;
