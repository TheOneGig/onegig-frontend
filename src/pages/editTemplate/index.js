import React, { useState, useEffect } from 'react';
import { Container, TextInput, Textarea, Flex, Title } from '@mantine/core';
import RichTextEditor from './richTextEditor';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getTemplate } from '../../hooks/templates';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const EditTemplatePage = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { templateId } = useParams();
  const { data: template, isLoading } = useQuery(['getTemplate'], () => getTemplate({ templateId }));

  // const { mutate: createTemplateMutation, isLoading: loadingCreate } = useMutation(
  //   ['createTemplate'],
  //   (variables) => createTemplate(variables),
  //   {
  //     onSuccess: () => {
  //       refetch();
  //     }
  //   }
  // );
  // const { mutate: updateTemplateMutation, isLoading: loadingUpdate } = useMutation(
  //   ['updateTemplate'],
  //   (variables) => updateTemplate(variables),
  //   {
  //     onSuccess: () => {
  //       refetch();
  //     }
  //   }
  // );
  // const { data: template, isLoading } = useQuery(['getTemplate'], (variables) => getTemplate(variables))

  useEffect(() => {
    if (template) {
      setContent(template.content);
      setTitle(template.title);
      setDescription(template.description);
    } else {
      setContent('');
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
          placeholder="Ingrese el título"
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
          style={{ maxWidth: '50%', marginTop: 10 }}
        />
        <DndProvider backend={HTML5Backend} style={{ marginTop: 20 }}>
          <RichTextEditor content={content} title={title} description={description} setContent={setContent} />
        </DndProvider>
        <Textarea
          placeholder="Brief description of this contract..."
          value={description}
          onChange={(event) => setDescription(event.currentTarget.value)}
          mt="md"
        />
      </Container>
    </>
  );
};

export default EditTemplatePage;
