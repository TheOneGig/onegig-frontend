import React from 'react';
import Draggable from 'react-draggable';
import { FaCheck, FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';

const styles = {
  container: {
    position: 'absolute',
    zIndex: 100000,
    border: `2px solid teal`
  },
  controls: {
    position: 'absolute',
    right: 0,
    display: 'inline-block',
    backgroundColor: 'teal'
  },
  smallButton: {
    display: 'inline-block',
    cursor: 'pointer',
    padding: 4
  }
};

DraggableSignature.propTypes = {
  url: PropTypes.string,
  onSet: PropTypes.func,
  onCancel: PropTypes.func,
  onInsertSignature: PropTypes.func
};

export default function DraggableSignature({ url, onSet, onCancel, onInsertSignature }) {
  const handleKeyDown = (event, callback) => {
    if (event.key === 'Enter' || event.key === ' ') {
      callback();
    }
  };

  const handleSetClick = () => {
    if (onInsertSignature) {
      onInsertSignature(url);
    }
    onSet();
  };

  return (
    <Draggable>
      <div style={styles.container}>
        <div style={styles.controls}>
          <div
            role="button"
            tabIndex={0}
            style={styles.smallButton}
            onClick={handleSetClick}
            onKeyDown={(event) => handleKeyDown(event, onSet)}
          >
            <FaCheck />
          </div>
          <div
            role="button"
            tabIndex={0}
            style={styles.smallButton}
            onClick={onCancel}
            onKeyDown={(event) => handleKeyDown(event, onCancel)}
          >
            <FaTimes />
          </div>
        </div>
        <img src={url} alt="Signature" width={200} style={styles.img} draggable={false} />
      </div>
    </Draggable>
  );
}
