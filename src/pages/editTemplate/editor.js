import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import PropTypes from "prop-types";

const toolbarOptions = {
  options: [
    "fontFamily",
    "fontSize",
    "history",
    "list",
    "textAlign",
    "colorPicker",
    "link",
    "emoji",
    "image",
    "embedded",
    "blockType",
    "inline",
    "remove",
  ],

};

const editorStyle = {
  height: "calc(297mm - 40px)",
  overflowY: "auto",
};

const TextEditor = ({ editorState, onChange, }) => {

  return (
    <>
      <Editor
        editorStyle={editorStyle}
        toolbar={toolbarOptions}
        editorState={editorState}
        onEditorStateChange={onChange}
      />
    </>
  );
};

export default TextEditor;

TextEditor.propTypes = {
  editorState: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};
