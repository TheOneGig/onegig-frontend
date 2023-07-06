import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import dayjs from 'dayjs';

export const exportToPdf = async (templateId) => {
  const editorNode = document.querySelector('.rdw-editor-main');

  if (!editorNode) {
    throw new Error('No editor found');
  }

  const canvas = await html2canvas(editorNode);
  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF('p', 'mm', 'a4');
  pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
  const pdfOutput = pdf.output('blob');

  const file = new File([pdfOutput], `document_${templateId}${dayjs().format('M_d_YYYY')}.pdf`, { type: 'application/pdf' });
  return file;
};

export const generateThumbnail = async (templateId) => {
  const editorNode = document.querySelector('.rdw-editor-main');

  if (!editorNode) {
    throw new Error('No editor found');
  }

  // Save original font size and padding
  const originalFontSize = window.getComputedStyle(editorNode).fontSize;
  const originalPadding = window.getComputedStyle(editorNode).padding;

  // Increase font size and padding for the screenshot
  editorNode.style.fontSize = '3.2em'; // Adjust as necessary to improve readability
  editorNode.style.padding = '10px'; // Add padding

  const scale = 5; // Increase scale for better resolution
  const canvas = await html2canvas(editorNode, { scale });

  // Restore original font size and padding
  editorNode.style.fontSize = originalFontSize;
  editorNode.style.padding = originalPadding;

  // Create a new canvas for the thumbnail
  const thumbnailCanvas = document.createElement('canvas');

  // Set thumbnail dimensions
  const thumbnailWidth = 500;
  const thumbnailHeight = 500;
  thumbnailCanvas.width = thumbnailWidth;
  thumbnailCanvas.height = thumbnailHeight;

  const ctx = thumbnailCanvas.getContext('2d');

  // Set background color to white, or another color that matches your PDF background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, thumbnailWidth, thumbnailHeight);

  // Calculate scale factor for width (we want the width to match the thumbnail width)
  const scaleFactor = thumbnailWidth / canvas.width;

  // Limit the height of the source image to the first part of the content
  const sourceHeight = Math.min(canvas.height, thumbnailHeight / scaleFactor);

  // Calculate the height based on the scale factor
  const scaledHeight = sourceHeight * scaleFactor;

  // Draw the original image scaled and centered on the thumbnail canvas
  ctx.drawImage(canvas, 0, 0, canvas.width, sourceHeight, 0, 0, thumbnailWidth, scaledHeight);

  return new Promise((resolve, reject) => {
    thumbnailCanvas.toBlob((blob) => {
      if (blob) {
        const fileName = `thumbnail_${templateId}${dayjs().format('M_d_YYYY')}.png`;
        const file = new File([blob], fileName, { type: 'image/png' });
        resolve(file);
      } else {
        reject(new Error('Failed to create blob from canvas'));
      }
    }, 'image/png');
  });
};
