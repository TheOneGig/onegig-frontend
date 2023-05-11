export const exportToPdf = async () => {
  const editorNode = document.querySelector('.rdw-editor-main');
  const editorImage = await toPng(editorNode);

  const signatureNode = document.querySelector('.rdw-editor-main img');
  const signatureImage = await toPng(signatureNode);

  const canvas = document.createElement('canvas');
  canvas.width = editorNode.clientWidth;
  canvas.height = editorNode.clientHeight;

  const ctx = canvas.getContext('2d');
  const editorImg = new Image();
  const signatureImg = new Image();

  editorImg.src = editorImage;
  signatureImg.src = signatureImage;

  editorImg.onload = () => {
    ctx.drawImage(editorImg, 0, 0);

    signatureImg.onload = () => {
      ctx.drawImage(signatureImg, signaturePosition.x, signaturePosition.y);

      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
      pdf.save('document.pdf');
    };
  };
};
