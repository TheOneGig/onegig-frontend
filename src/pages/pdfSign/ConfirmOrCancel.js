import { Button } from '@mantine/core';
import React from 'react';
import PropTypes from 'prop-types';

ConfirmOrCancel.propTypes = {
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  leftBlock: PropTypes.node,
  hideCancel: PropTypes.bool,
  disabled: PropTypes.bool
};

export function ConfirmOrCancel({ onCancel, onConfirm, leftBlock, hideCancel, disabled }) {
  const styles = {
    actions: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    cancel: {
      marginRight: 8,
      marginTop: 8,
    }
  };

  return (
    <div style={styles.actions}>
      <div>{leftBlock}</div>
      <div>
        {!hideCancel ? (
          <Button variant='light' style={styles.cancel} onClick={onCancel}>
            Cancel
          </Button>
        ) : null}
        <Button variant='light' onClick={onConfirm} disabled={disabled}>
          Confirm
        </Button>
      </div>
    </div>
  );
}
