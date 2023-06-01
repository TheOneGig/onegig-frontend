import { Dialog } from './Dialog';
import SignatureCanvas from 'react-signature-canvas';
import { ConfirmOrCancel } from './ConfirmOrCancel';
import { fabric } from 'fabric';
import { useRef, useState } from 'react';

const styles = {
  sigContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  sigBlock: {
    display: 'inline-block',
    border: '1px solid teal',
    backgroundColor: '#f1f1f1'
  },
  instructions: {
    display: 'flex',
    justifyContent: 'space-between',
    textAlign: 'center',
    marginTop: 8,
    width: 600,
    alignSelf: 'center'
  },
  instructionsContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  textContainer: {
    width: '60%',
    backgroundColor: '#f1f1f1 !important',
    border: '1px solid teal',
    height: 50,
    fontSize: 26,
    padding: 5
  },
  switchButton: {
    backgroundColor: '#424242',
    color: 'white',
    marginTop: 10,
    border: '1px solid black',
    borderRadius: 4,
    cursor: 'pointer',
    padding: 5
  }
};

AddSigDialog.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  autoDate: PropTypes.bool.isRequired,
  setAutoDate: PropTypes.func.isRequired
};

export function AddSigDialog({ onConfirm, onClose, autoDate, setAutoDate }) {
  const sigRef = useRef(null);
  const [isTextSignature, setIsTextSignature] = useState(false);

  async function convertTextToImage(text, width = 300, height = 80) {
    const canvas = new fabric.StaticCanvas();
    canvas.setWidth(width);
    canvas.setHeight(height);

    const textObj = new fabric.Text(text, {
      fontFamily: 'Brush Script MT',
      left: 20,
      top: height / 3,
      fontSize: 50
    });

    canvas.add(textObj);
    canvas.renderAll();

    return canvas.toDataURL('image/png');
  }

  return (
    <Dialog
      isVisible={true}
      title={'Add signature'}
      body={
        <>
          <div style={styles.sigContainer}>
            {isTextSignature ? (
              <input style={styles.textContainer} type="text" ref={sigRef} />
            ) : (
              <div style={styles.sigBlock}>
                <SignatureCanvas
                  velocityFilterWeight={1}
                  ref={sigRef}
                  canvasProps={{
                    width: '600',
                    height: 200,
                    className: 'sigCanvas'
                  }}
                />
              </div>
            )}
          </div>
          <div>
            <button style={styles.switchButton} onClick={() => setIsTextSignature(!isTextSignature)}>
              Switch to {isTextSignature ? 'draw' : 'text'} signature
            </button>
          </div>
          <div style={styles.instructionsContainer}>
            <div style={styles.instructions}>
              <div>
                Auto date/time <input type={'checkbox'} checked={autoDate} onChange={(e) => setAutoDate(e.target.checked)} />
              </div>
              <div>{isTextSignature ? 'Enter' : 'Draw'} your signature above</div>
            </div>
          </div>

          <ConfirmOrCancel
            onCancel={onClose}
            onConfirm={async () => {
              let sig;
              if (isTextSignature) {
                const text = await convertTextToImage(sigRef.current.value);
                sig = text;
              } else {
                sig = sigRef.current.toDataURL(); // get drawn signature
              }
              onConfirm(sig);
            }}
          />
        </>
      }
    />
  );
}
