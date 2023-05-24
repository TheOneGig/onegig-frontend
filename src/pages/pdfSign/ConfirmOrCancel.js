import { Button } from "@mantine/core";
import React from "react";

export function ConfirmOrCancel({
  onCancel,
  onConfirm,
  leftBlock,
  hideCancel,
  disabled
}) {
  const styles = {
    actions: {
      display: "flex",
      justifyContent: "space-between",
    },
    cancel: {
      marginRight: 8,
      marginTop: 8,
    },
  };

  return (
    <div style={styles.actions}>
      <div>{leftBlock}</div>
      <div>
        {!hideCancel ? (
          <Button
            style={styles.cancel}
            onClick={onCancel}
          >
            Cancel 
          </Button>
        ) : null
        }
        <Button  onClick={onConfirm} disabled={disabled}> 
            Confirm
        </Button>
      </div>
    </div>
  );
}
