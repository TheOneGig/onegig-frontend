import React, { useState } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Button, Container } from '@mantine/core';
import { textToSignature } from './textToSignature';
import { exportToPdf } from './exportPdf';
import DraggableSignature from './draggableSignature';
import DroppableEditor from './droppableEditor';
import PropTypes from 'prop-types';
import SignatureModal from './signatureModal';
import { insertSignature } from './insertSignature';

const wrapperStyle = {
  border: '1px solid #ccc',
  backgroundColor: 'white',
  borderRadius: '4px',
  color: 'black',
  width: '8.5in',
  minHeight: '8.5in',
  padding: '10px',
  margin: '20px auto',
  boxShadow: '0px 2px 8px rgba(60, 64, 67, 0.3)',
  position: 'relative'
};

const RichTextEditor = ({ title, description, content, setContent }) => {
  const [editorState, setEditorState] = useState(() =>
    content ? EditorState.createWithContent(convertFromRaw(JSON.parse(content))) : EditorState.createEmpty()
  );
  const [opened, setOpened] = useState(false);
  // const [signatureText, setSignatureText] = useState('');
  const signatureText = 'John Doe';
  const [signatureImage, setSignatureImage] = useState(null);
  // const [initialX, setInitialX] = useState(0);
  // const [initialY, setInitialY] = useState(0);

  const handleEditorChange = (state) => {
    setEditorState(state);
    setContent(JSON.stringify(convertToRaw(state.getCurrentContent())));
  };

  const insertTextSignature = () => {
    const imageURL = textToSignature(signatureText);
    setOpened(false);
    setSignatureImage(imageURL);
  };

  const insertImage = (item) => {
    setSignatureImage(item.url);
    // const { x, y } = item;
    // setInitialX(x);
    // setInitialY(y);
    setOpened(false);
  };

  const handleSave = () => {
    const variables = {
      title: title,
      description: description,
      content: content,
      templateId
    };

    if (templateId) {
      updateTemplateMutation({ variables });
    } else {
      createTemplateMutation({ variables });
    }
  };

  return (
    <>
      <Container>
        <div style={wrapperStyle}>
          <DroppableEditor editorState={editorState} onChange={handleEditorChange} onDrop={insertImage} />
          {signatureImage && (
            <DraggableSignature
              url={signatureImage}
              onEnd={() => {
                setSignatureImage(null);
              }}
              onSet={() => {
                setSignatureImage(null);
              }}
              onCancel={() => {
                setSignatureImage(null);
              }}
              onInsertSignature={(imageUrl) => {
                const newEditorState = insertSignature(editorState, imageUrl);
                handleEditorChange(newEditorState);
              }}
            />
          )}
        </div>
      </Container>
      <Button variant="outline" onClick={() => setOpened(true)} style={{ marginTop: 20 }}>
        Add Signature
      </Button>
      <Button variant="outline" onClick={exportToPdf} style={{ marginLeft: 20 }}>
        Export to PDF
      </Button>
      <Button color="teal" onClick={handleSave} style={{ marginLeft: 20 }}>
        Save Template
      </Button>
      <SignatureModal
        opened={opened}
        setOpened={setOpened}
        onClose={() => setOpened(false)}
        onInsertSignature={insertImage || insertTextSignature}
      />
    </>
  );
};

export default RichTextEditor;

RichTextEditor.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  content: PropTypes.string,
  setContent: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired
};
