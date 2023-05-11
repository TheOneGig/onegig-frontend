import { Modifier, SelectionState, EditorState, AtomicBlockUtils } from "draft-js";

const insertSignature = (editorState, imageUrl) => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity("IMAGE", "IMMUTABLE", { src: imageUrl });
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });

  // Insert signature as an atomic block
  const newStateWithSignature = AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');

  // Insert date as a text block
  const contentStateWithDate = newStateWithSignature.getCurrentContent();
  const selectionState = newStateWithSignature.getSelection();
  const dateBlockKey = selectionState.getStartKey();
  const currentBlock = contentStateWithDate.getBlockForKey(dateBlockKey);
  const currentBlockLength = currentBlock.getLength();

  // Create a new selection state to insert the date
  const newSelectionState = new SelectionState({
    anchorKey: dateBlockKey,
    anchorOffset: currentBlockLength,
    focusKey: dateBlockKey,
    focusOffset: currentBlockLength,
  });

  // Insert the date and apply the new content state
  const contentStateWithDateInserted = Modifier.insertText(contentStateWithDate, newSelectionState, ` ${new Date().toLocaleDateString()}`);
  const newStateWithSignatureAndDate = EditorState.push(newStateWithSignature, contentStateWithDateInserted, 'insert-characters');

  return newStateWithSignatureAndDate;
};


export { insertSignature }