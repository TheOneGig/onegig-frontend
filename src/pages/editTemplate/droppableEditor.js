import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';

const toolbarOptions = {
  options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'image', 'embedded']
};

const editorStyle = {
  height: 'calc(9in - 20px)',
  overflowY: 'auto'
};

const DroppableEditor = ({ editorState, onChange, onDrop }) => {
  // const handleDrop = (item) => {
  //   const newEditorState = insertSignature(editorState, item.url);
  //   onChange(newEditorState);
  // };

  const [{ isOver }, drop] = useDrop({
    accept: 'signature',
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  });

  return (
    <div
      ref={drop}
      style={{
        border: isOver ? '1px dashed #666' : '1px solid #ccc',
        backgroundColor: isOver ? '#f3f3f3' : 'white'
      }}
    >
      <Editor editorStyle={editorStyle} toolbar={toolbarOptions} editorState={editorState} onEditorStateChange={onChange} />
    </div>
  );
};

export default DroppableEditor;

DroppableEditor.propTypes = {
  editorState: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired
};
