import Draggable from "react-draggable";
import {Button} from "@mantine/core"; // The default
import {FaCheck, FaTimes} from 'react-icons/fa'
import {cleanBorder, errorColor, goodColor, primary45} from "utils/colors";

export default function DraggableSignature({ url, onEnd, onSet, onCancel }) {
  const styles = {
    container: {
      position: 'absolute',
      zIndex: 100000,
      border: `2px solid ${primary45}`,
    },
    controls: {
      position: 'absolute',
      right: 0,
      display: 'inline-block',
      backgroundColor: primary45,
      // borderRadius: 4,
    },
    smallButton: {
      display: 'inline-block',
      cursor: 'pointer',
      padding: 4,
    }
  }
  const handleKeyDown = (event, action) => {
    if(event.key === 'Enter') {
      action();
    }
  }

  return (
    <Draggable onStop={onEnd}>
      <div style={styles.container} 
       role="button"
        tabIndex={0}
        onKeyDown={(e) => handleKeyDown(e, onEnd)}>
        <div style={styles.controls} >
          <div style={styles.smallButton} onClick={onSet}  onKeyDown={(e) => handleKeyDown(e, onSet)}
            role="button" 
            tabIndex={0}><FaCheck color={goodColor}/></div>
          <div style={styles.smallButton} onClick={onCancel}  onKeyDown={(e) => handleKeyDown(e, onSet)}
            role="button" 
            tabIndex={0}><FaTimes color={errorColor}/></div>
        </div>
        <img src={url} width={200} alt={"signature"} style={styles.img} draggable={false} />
      </div>
    </Draggable>
  );
}
