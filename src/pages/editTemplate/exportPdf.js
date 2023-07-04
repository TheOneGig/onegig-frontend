import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import dayjs from 'dayjs';

export const exportToPdf = async () => {
  const editorNode = document.querySelector('.rdw-editor-main');

  if (!editorNode) {
    throw new Error('No editor found');
  }

  const canvas = await html2canvas(editorNode, {
    scale: window.devicePixelRatio, // Ajusta la escala basándose en el ratio de píxeles del dispositiv
    useCORS: true
  });

  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF('p', 'mm', 'a4');

  const pageWidth = pdf.internal.pageSize.getWidth();
  const contentWidth = canvas.width;
  const contentHeight = canvas.height;

  const height = pageWidth * (contentHeight / contentWidth);

  pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, height);

  const pdfOutput = pdf.output('blob');

  const file = new File([pdfOutput], `document${dayjs().format('M_d_YYYY')}.pdf`, { type: 'application/pdf' });
  return file;
};
