import Draggable from 'react-draggable';
import { FaCheck, FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';

DraggableSignature.propTypes = {
  onEnd: PropTypes.func.isRequired,
  onSet: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired
};

export default function DraggableSignature({ url, onEnd, onSet, onCancel }) {
  const styles = {
    container: {
      position: 'absolute',
      zIndex: 100000,
      color: 'black',
      border: '2px solid #1e1e1e',
      borderRadius: 5
    },
    controls: {
      position: 'absolute',
      right: 0,
      display: 'inline-block',
      backgroundColor: '#1e1e1e',
      padding: 2
    },
    smallButton: {
      display: 'inline-block',
      cursor: 'pointer',
      marginRight: 3,
      borderRadius: 5
    }
  };
  const handleKeyDown = (event, action) => {
    if (event.key === 'Enter') {
      action();
    }
  };

  return (
    <Draggable onStop={onEnd}>
      <div style={styles.container} role="button" tabIndex={0} onKeyDown={(e) => handleKeyDown(e, onEnd)}>
        <div style={styles.controls}>
          <div style={styles.smallButton} onClick={onSet} onKeyDown={(e) => handleKeyDown(e, onSet)} role="button" tabIndex={0}>
            <FaCheck color={'green'} />
          </div>
          <div style={styles.smallButton} onClick={onCancel} onKeyDown={(e) => handleKeyDown(e, onSet)} role="button" tabIndex={0}>
            <FaTimes color={'red'} />
          </div>
        </div>
        <img src={url} width={200} alt={'signature'} style={styles.img} draggable={false} />
      </div>
    </Draggable>
  );
}
