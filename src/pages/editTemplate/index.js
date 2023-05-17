import React, { useState, useEffect } from "react";
import { Container, TextInput, Textarea, Flex, Title } from "@mantine/core";
import RichTextEditor from "./richTextEditor";
import { useParams } from "react-router-dom";
import { useQuery } from 'react-query';
import {  getTemplate, } from "../../hooks/templates";
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import useAuth from 'hooks/useAuth';

const EditTemplatePage = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useAuth();
  const userId = user.id;
  const { templateId } = useParams();
  const { data: template, isLoading, refetch } = useQuery(['getTemplate'], () => getTemplate({ templateId }));


  useEffect(() => {
    let editorState;

    if (template && template.content) {
      const contentState = convertFromRaw(JSON.parse(template.content));
      editorState = EditorState.createWithContent(contentState);
      setTitle(template.title);
      setDescription(template.description);
    } else {
      editorState = EditorState.createEmpty();
      setTitle("");
      setDescription("");
    }

    const jsonContent = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    setContent(jsonContent);
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
          style={{ maxWidth: "50%", marginTop: 10 }}
        />
        <div style={{ marginTop: '20px' }}>
          <RichTextEditor content={content} template={template} refetch={refetch} userId={userId} templateId={templateId} title={title} description={description} setContent={setContent} />
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
