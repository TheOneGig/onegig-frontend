import { fabric } from 'fabric';

export const textToSignature = (text, width = 400, height = 200) => {
  const canvas = new fabric.StaticCanvas();
  canvas.setWidth(width);
  canvas.setHeight(height);


  const textObj = new fabric.Text(text, {
    fontFamily: 'Brush Script MT',
    left: 20,
    top: height / 2,
  });

  canvas.add(textObj);
  canvas.renderAll();

  return canvas.toDataURL('image/png');
};
