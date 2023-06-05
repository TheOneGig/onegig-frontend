import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import dayjs from 'dayjs';

export const exportToPdf = async () => {
  const editorNode = document.querySelector('.rdw-editor-main');

  if (!editorNode) {
    throw new Error('No editor found');
  }

  const canvas = await html2canvas(editorNode);
  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF('p', 'mm', 'a4');
  pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
  const pdfOutput = pdf.output('blob');

  const file = new File([pdfOutput], `document${dayjs().format('M_d_YYYY')}.pdf`, { type: 'application/pdf' });
  return file;
};
