import React, { useState, useEffect } from 'react';
import { Container, TextInput, Textarea, Flex, Title } from '@mantine/core';
import RichTextEditor from './richTextEditor';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getTemplate } from '../../hooks/templates';
import { EditorState, convertFromRaw } from 'draft-js';
import useAuth from 'hooks/useAuth';
import useWorkspace from 'hooks/useWorkspace';

const EditTemplatePage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { user } = useAuth();
  const { workspaceId } = useWorkspace();
  const userId = user.id;
  const { templateId } = useParams();
  const { data: template, isLoading, refetch } = useQuery(['getTemplate'], () => getTemplate({ templateId }));
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  useEffect(() => {
    if (template && template.content) {
      const contentState = convertFromRaw(JSON.parse(template.content));
      setEditorState(EditorState.createWithContent(contentState));
      setTitle(template.title);
      setDescription(template.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [template]);

  if (isLoading) {
    return <div>Loading Editor...</div>;
  }

  return (
    <>
      <Flex align="flex-start">
        <Title h={40}>Template Editor</Title>
      </Flex>
      <Container>
        <TextInput
          id="title-input"
          label="Title"
          placeholder="Enter title"
          value={title}
          withAsterisk
          onChange={(event) => setTitle(event.currentTarget.value)}
          style={{ maxWidth: '50%', marginTop: 10 }}
        />
        <div style={{ marginTop: '20px' }}>
          <RichTextEditor
            template={template}
            refetch={refetch}
            editorState={editorState}
            setEditorState={setEditorState}
            workspaceId={workspaceId}
            userId={userId}
            templateId={templateId}
            title={title}
            description={description}
          />
        </div>
        <Textarea
          placeholder="Brief description of this contract..."
          label="Description"
          withAsterisk
          value={description}
          onChange={(event) => setDescription(event.currentTarget.value)}
          mt="md"
        />
      </Container>
    </>
  );
};

export default EditTemplatePage;
