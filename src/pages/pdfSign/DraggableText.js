import Draggable from 'react-draggable';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';

DraggableText.propTypes = {
  onEnd: PropTypes.func.isRequired,
  onSet: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  initialText: PropTypes.string
};

export default function DraggableText({ onEnd, onSet, onCancel, initialText }) {
  const [text, setText] = useState('Text');
  const inputRef = useRef(null);

  useEffect(() => {
    if (initialText) {
      setText(initialText);
    } else {
      inputRef.current.focus();
      inputRef.current.select();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyPress = (callback) => (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      callback();
    }
  };

  const styles = {
    container: {
      position: 'absolute',
      zIndex: 100000,
      border: '2px solid #1e1e1e',
      borderRadius: 5
    },
    controls: {
      position: 'absolute',
      right: 0,
      display: 'inline-block',
      backgroundColor: '#1e1e1e'
    },
    smallButton: {
      display: 'inline-block',
      cursor: 'pointer',
      padding: 1,
      marginRight: 3,
      borderRadius: 5
    },
    input: {
      border: 0,
      fontSize: 16,
      padding: 3,
      cursor: 'move'
    }
  };
  return (
    <Draggable onStop={onEnd}>
      <div style={styles.container}>
        <div style={styles.controls}>
          <div
            role="button"
            tabIndex="0"
            style={styles.smallButton}
            onClick={() => onSet(text)}
            onKeyPress={handleKeyPress(() => onSet(text))}
          >
            <FaCheck color={'green'} />
          </div>
          <div role="button" tabIndex="0" style={styles.smallButton} onClick={onCancel} onKeyPress={handleKeyPress(onCancel)}>
            <FaTimes color={'red'} />
          </div>
        </div>
        <input ref={inputRef} style={styles.input} value={text} placeholder={'Text'} onChange={(e) => setText(e.target.value)} />
      </div>
    </Draggable>
  );
}
