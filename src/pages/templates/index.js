import React from 'react';
import { Grid, Text, Tooltip, Title, Box, Flex } from '@mantine/core';
import SingleTemplateCard from './templateCard';
import { PlusCircleOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import { useQuery } from 'react-query';
import { getAllTemplates } from 'hooks/templates';
//import {ScrollX}

const StyledPlusCircleOutlined = styled(PlusCircleOutlined)`
  font-size: 3.5rem;
  color: #1890ff;
  cursor: pointer;
  position: fixed;
  bottom: 50px;
  right: 50px;

  &:hover {
    transform: scale(1.3);
    transition: all 0.5s ease-in-out;
  }
`;

const TemplatesPage = () => {
  const { user } = useAuth();
  const userId = user.id;
  const navigate = useNavigate();
  const { data: templates, isLoading, refetch } = useQuery(['templates'], () => getAllTemplates({ userId }));
  console.log('templates:', templates);

  const handleCreateNewTemplate = () => {
    const newId = uuid();
    navigate(`/edittemplate/${newId}`);
  };

  const dummyData = [
    {
      id: 1,
      title: 'Template 1',
      preview: 'https://via.placeholder.com/300x200',
      description: 'This is a template, click inside it to see the actions for this template',
      content: 'This is the content of template 1'
    },
    {
      id: 2,
      title: 'Template 2',
      preview: 'https://via.placeholder.com/300x200',
      description: 'This is a template, click inside it to see the actions for this template',
      content: 'This is the content of template 1'
    },
    {
      id: 3,
      title: 'Template 3',
      preview: 'https://via.placeholder.com/300x200',
      description: 'This is a template, click inside it to see the actions for this template',
      content: 'This is the content of template 1'
    },
    {
      id: 4,
      title: 'Template 4',
      preview: 'https://via.placeholder.com/300x200',
      description: 'This is a template, click inside it to see the actions for this template',
      content: 'This is the content of template 1'
    },
    {
      id: 5,
      title: 'Template 5',
      preview: 'https://via.placeholder.com/300x200',
      description: 'This is a template, click inside it to see the actions for this template',
      content: 'This is the content of template 1'
    },
    {
      id: 6,
      title: 'Template 6',
      preview: 'https://via.placeholder.com/300x200',
      description: 'This is a template, click inside it to see the actions for this template',
      content: 'This is the content of template 1'
    }
  ];

  if (isLoading) {
    return <div>Loading Templates...</div>;
  }

  return (
    <>
      <Flex mih={180} gap="md" justify="center" align="flex-start" direction="column" wrap="wrap">
        <Title h={40}>Welcome to the Templates!</Title>
        <Text weight={500}>
          Manage your professional agreements effortlessly in one centralized location. Create, review, and track the progress of all your
          contracts with ease. Stay organized and never miss a deadline again!
        </Text>
      </Flex>
      <Grid>
        {dummyData.map((template) => (
          <Box key={template.id} maw={350} mx="auto" mb={20}>
            <SingleTemplateCard key={template.templateId} refetch={refetch} isLoading={isLoading} template={template} />
          </Box>
        ))}
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
          <StyledPlusCircleOutlined onClick={handleCreateNewTemplate} />
        </Tooltip>
      </Grid>
    </>
  );
};

export default TemplatesPage;
