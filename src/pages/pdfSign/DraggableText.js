import Draggable from "react-draggable";
import { FaCheck, FaTimes } from "react-icons/fa";
import { cleanBorder, errorColor, goodColor, primary45 } from "utils/colors";
import { useState, useEffect, useRef } from "react";

export default function DraggableText({ onEnd, onSet, onCancel, initialText }) {
  const [text, setText] = useState("Text");
  const inputRef = useRef(null);

  useEffect(() => {
    if (initialText) {
      setText(initialText)
    } else {
      inputRef.current.focus();
      inputRef.current.select()
    }
  }, [])

  const handleKeyPress = (callback) => (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      callback();
    }
  };

  const styles = {
    container: {
      position: "absolute",
      zIndex: 100000,
      border: `2px solid ${primary45}`,
    },
    controls: {
      position: "absolute",
      right: 0,
      display: "inline-block",
      backgroundColor: primary45,
    },
    smallButton: {
      display: "inline-block",
      cursor: "pointer",
      padding: 4,
    },
    input: {
      border: 0,
      fontSize: 20,
      padding: 3,
      backgroundColor: 'rgba(0,0,0,0)',
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
            onClick={()=>onSet(text)} 
            onKeyPress={handleKeyPress(()=>onSet(text))}
          >
            <FaCheck color={goodColor} />
          </div>
          <div 
            role="button" 
            tabIndex="0"
            style={styles.smallButton} 
            onClick={onCancel} 
            onKeyPress={handleKeyPress(onCancel)}
          >
            <FaTimes color={errorColor} />
          </div>
        </div>
        <input
          ref={inputRef}
          style={styles.input}
          value={text}
          placeholder={'Text'}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </Draggable>
  );
}
