import React from 'react';

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  isVisible: PropTypes.bool.isRequired,
  style: PropTypes.object,
  positionTop: PropTypes.number
};

export function Modal({ onClose, children, isVisible, style, positionTop }) {
  const styles = {
    container: {
      position: 'absolute',
      backgroundColor: '#1e1e1e',
      borderRadius: 4,
      top: positionTop ? positionTop : 150,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '50%',
      zIndex: 10000,
      boxShadow: '0 0px 14px hsla(0, 0%, 0%, 0.2)'
    },
    background: {
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      zIndex: 5000
    }
  };

  if (!isVisible) {
    return null;
  }

  const handleKeyDown = (event, action) => {
    if (event.key === 'Enter') {
      action();
    }
  };

  return (
    <div style={styles.outer}>
      <div style={styles.background} onKeyDown={(e) => handleKeyDown(e, onSet)} role="button" tabIndex={0} onClick={onClose} />
      <div style={{ ...styles.container, ...style }}>{children}</div>
    </div>
  );
}
