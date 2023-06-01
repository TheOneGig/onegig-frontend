import React from 'react';
import { Grid, Text, Tooltip, Title, Box, Flex } from '@mantine/core';
import SingleTemplateCard from './templateCard';
import { PlusCircleOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import { useQuery } from 'react-query';
import { getTemplates } from 'hooks/templates';

const StyledPlusCircleOutlined = styled(PlusCircleOutlined)`
  font-size: 3.5rem;
  color: #1890ff;
  cursor: pointer;
  position: fixed;
  bottom: 50px;
  right: 50px;

  &:hover {
    transform: scale(1.2);
    transition: all 0.3s ease-in-out;
  }
`;

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
      <Flex mih={100} gap="md" justify="center" align="flex-start" direction="column" wrap="wrap">
        <Title h={40}>Welcome to the Templates!</Title>
        <Text weight={500}>
          Manage your professional agreements effortlessly in one centralized location. Create, review, and track the progress of all your
          contracts templates with ease.
        </Text>
      </Flex>
      <Grid mt={20}>
        {templates.map((template, index) => (
          <Box key={index} maw={350} mx="auto" mb={20}>
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
