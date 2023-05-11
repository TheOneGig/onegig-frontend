// SignatureModal.js
import React, { useState, useRef } from 'react';
import { Modal, Button, Textarea } from '@mantine/core';
import SignaturePad from 'react-signature-canvas';
import { textToSignature } from './textToSignature';
import PropTypes from 'prop-types';

const SignatureModal = ({ opened, setOpened, onClose, onInsertSignature }) => {
  const [signatureText, setSignatureText] = useState('');
  const [signatureMode, setSignatureMode] = useState('canvas');
  const sigCanvas = useRef();

  const handleSignatureTextChange = (e) => {
    setSignatureText(e.target.value);
  };

  const clear = () => sigCanvas.current.clear();

  const save = () => {
    const imageURL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    onInsertSignature({ url: imageURL });
    onClose();
  };

  const insertTextSignature = () => {
    const imageURL = textToSignature(signatureText);
    onInsertSignature({ url: imageURL });
    onClose();
  };

  return (
    <Modal opened={opened} mt={50} onClose={() => setOpened(false)} title="Add Signature" hideCloseButton>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
        <Button
          onClick={() => setSignatureMode('canvas')}
          color={signatureMode === 'canvas' ? 'blue' : 'red'}
          variant={signatureMode === 'canvas' ? 'filled' : 'outline'}
          style={{ marginRight: 10 }}
        >
          Draw Signature
        </Button>
        <Button
          color={signatureMode === 'text' ? 'blue' : 'red'}
          onClick={() => setSignatureMode('text')}
          variant={signatureMode === 'text' ? 'filled' : 'outline'}
        >
          Text Signature
        </Button>
      </div>
      {signatureMode === 'canvas' ? (
        <>
          <SignaturePad
            ref={sigCanvas}
            canvasProps={{
              width: 400,
              height: 200,
              className: 'sigCanvas',
              style: { background: 'white' }
            }}
          />
          <Button variant="outline" onClick={save}>
            Insert Signature
          </Button>
          <Button mt={20} ml={20} variant="outline" onClick={clear}>
            Clear
          </Button>
        </>
      ) : (
        <div style={{ marginTop: 20 }}>
          <Textarea placeholder="Type your signature here..." value={signatureText} onChange={handleSignatureTextChange} mt="md" />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
            <Button variant="outline" onClick={insertTextSignature}>
              Insert Signature
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

SignatureModal.propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onInsertSignature: PropTypes.func.isRequired,
  setOpened: PropTypes.func
};

export default SignatureModal;
